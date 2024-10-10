import { resolve } from "node:path";
import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { JSONFilePreset } from "lowdb/node";
import { z } from "zod";

interface Folder {
  id: string;
  name: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string | null;
  createdAt: number;
  updatedAt: number;
}

const dbJsonPath = resolve(process.cwd(), process.env.NOTES_DB || "db.json");

const db = await JSONFilePreset<{
  folders: Folder[];
  notes: Note[];
}>(dbJsonPath, {
  notes: [],
  folders: [],
});

const allowOrigins = String(process.env.NOTES_API_ALLOW_ORIGIN ?? "").split(
  ","
);

const app = new Hono()
  .use(
    cors({
      origin: allowOrigins,
    })
  )
  .get("/test", async (c) => {
    return c.json({
      dbJsonPath,
      allowOrigins,
    });
  })
  // Notes
  .route(
    "/notes",
    new Hono()
      .post(
        "/",
        zValidator(
          "json",
          z.object({
            title: z.string().optional(),
            content: z.string().optional(),
            folderId: z.string().optional(),
            tagIds: z.string().array().optional(),
          })
        ),
        async (c) => {
          const {
            title = "",
            content = "",
            folderId = null,
          } = c.req.valid("json");

          const note: Note = {
            id: crypto.randomUUID(),
            title,
            content,
            folderId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };

          await db.update((data) => {
            data.notes.push(note);
          });

          return c.json(note, 201);
        }
      )
      .get("/", async (c) => {
        await db.read();

        return c.json(db.data.notes);
      })
      .get("/:id", async (c) => {
        await db.read();

        const note = db.data.notes.find((n) => n.id === c.req.param("id"));

        if (!note) {
          return c.json({ error: "Note not found" }, 404);
        }

        return c.json(note);
      })
      .put(
        "/:id",
        zValidator(
          "json",
          z.object({
            title: z.string(),
            content: z.string(),
            folderId: z.string(),
            tagIds: z.string().array(),
          })
        ),
        async (c) => {
          await db.read();

          const { title, content, folderId, tagIds } = c.req.valid("json");

          const noteIndex = db.data.notes.findIndex(
            (n) => n.id === c.req.param("id")
          );

          if (noteIndex === -1) {
            return c.json({ error: "Note not found" }, 404);
          }

          db.data.notes[noteIndex] = {
            ...db.data.notes[noteIndex],
            title,
            content,
            folderId,
            updatedAt: Date.now(),
          };

          return c.json(db.data.notes[noteIndex]);
        }
      )
      .delete("/:id", async (c) => {
        await db.read();

        const noteIndex = db.data.notes.findIndex(
          (n) => n.id === c.req.param("id")
        );

        if (noteIndex === -1) {
          return c.json({ error: "Note not found" }, 404);
        }

        await db.update((data) => {
          data.notes.splice(noteIndex, 1);
        });

        return c.json({ message: "Note deleted successfully" });
      })
  )
  // Folders
  .route(
    "/folders",
    new Hono()
      .post(
        "/",
        zValidator(
          "json",
          z.object({
            name: z.string(),
          })
        ),
        async (c) => {
          const { name } = c.req.valid("json");
          const folder: Folder = { id: crypto.randomUUID(), name };

          await db.update((data) => {
            data.folders.push(folder);
          });

          return c.json(folder, 201);
        }
      )
      .get("/", async (c) => {
        await db.read();

        return c.json(db.data.folders);
      })
  );

export type AppType = typeof app;

export { app };
