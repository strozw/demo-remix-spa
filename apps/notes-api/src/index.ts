import fs from "node:fs/promises";
import { resolve } from "node:path";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
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

await fs.stat(dbJsonPath).catch(async (_error) => {
  await fs.writeFile(dbJsonPath, JSON.stringify({ folders: [], notes: [] }));
  console.log(`create ${dbJsonPath}`);
});

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
            folderId: z.string().or(z.null()).optional(),
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
            folderId: folderId || null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };

          await db.update((data) => {
            data.notes.push(note);
          });

          return c.json(note, 201);
        }
      )
      .get(
        "/",
        zValidator(
          "query",
          z.object({
            folderId: z
              .string()
              .or(z.enum(["uncategorized"]))
              .optional(),
          })
        ),
        async (c) => {
          const { folderId } = c.req.valid("query");

          await db.read();

          if (folderId) {
            return c.json(
              db.data.notes.filter((note) => {
                if (folderId === "uncategorized") {
                  return !note.folderId;
                }

                return note.folderId === folderId;
              })
            );
          }

          return c.json(db.data.notes);
        }
      )
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
            folderId: z.string().or(z.null()).optional(),
          })
        ),
        async (c) => {
          await db.read();

          const { title, content, folderId = null } = c.req.valid("json");

          const noteIndex = db.data.notes.findIndex(
            (n) => n.id === c.req.param("id")
          );

          if (noteIndex === -1) {
            return c.json({ error: "Note not found" }, 404);
          }

          await db.update((data) => {
            data.notes[noteIndex] = {
              ...data.notes[noteIndex],
              title,
              content,
              folderId: folderId || null,
              updatedAt: Date.now(),
            };
          });

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
      .get("/:id", async (c) => {
        await db.read();

        const folder = db.data.folders.find(
          (folder) => folder.id === c.req.param("id")
        );

        if (!folder) {
          throw new HTTPException(404);
        }

        return c.json(folder);
      })
      .delete("/:id", async (c) => {
        const folderId = c.req.param("id");

        await db.read();

        const index = db.data.folders.findIndex(
          (folder) => folder.id === folderId
        );

        if (index === -1) {
          return c.json({ error: "Folder not found" }, 404);
        }

        await db.update((data) => {
          for (const note of data.notes) {
            if (note.folderId === folderId) {
              note.folderId = null;
            }
          }

          data.folders.splice(index, 1);
        });

        return c.json({ message: "Folder deleted successfully" });
      })
  );

export type AppType = typeof app;

export { app };
