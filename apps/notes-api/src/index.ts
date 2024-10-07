import { Hono } from "hono";
import { JSONFilePreset } from "lowdb/node";
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"

interface Folder {
  id: string;
  name: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string | null;
  tagIds: string[];
  createdAt: Date;
}

interface Tag {
  id: string;
  name: string;
}

// In-memory storage (replace with a database in a real application)
const folders: Folder[] = [];
const notes: Note[] = [];
const tags: Tag[] = [];

const db = await JSONFilePreset("db.json", {
  notes,
  folders,
  tags,
});

const app = new Hono()
	// Notes
  .route(
    "/notes",
    new Hono()
      .post("/", zValidator('json', z.object({
				title: z.string().optional(),
				content: z.string().optional(),
				folderId: z.string().optional(),
				tagIds: z.string().array().optional(),
			})), async (c) => {
        const { title = '', content = '', folderId = null, tagIds = [] } = c.req.valid('json');

        const note: Note = {
          id: crypto.randomUUID(),
          title,
          content,
          folderId,
          tagIds,
          createdAt: new Date(),
        };

        await db.update((data) => {
          data.notes.push(note);
        });

        return c.json(note, 201);
      })
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
      .put("/:id", zValidator('json', z.object({
				title: z.string(),
				content: z.string(),
				folderId: z.string(),
				tagIds: z.string().array(),
			})), async (c) => {
        await db.read();

        const { title, content, folderId, tagIds } = c.req.valid('json');

        const noteIndex = db.data.notes.findIndex(
          (n) => n.id === c.req.param("id")
        );

        if (noteIndex === -1) {
          return c.json({ error: "Note not found" }, 404);
        }

        notes[noteIndex] = {
          ...notes[noteIndex],
          title,
          content,
          folderId,
          tagIds,
        };

        return c.json(notes[noteIndex]);
      })
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
      .post("/", zValidator("json", z.object({
				name: z.string(),
			})), async (c) => {
        const { name } = c.req.valid("json");
        const folder: Folder = { id: crypto.randomUUID(), name };

        await db.update((data) => {
          data.folders.push(folder);
        });

        return c.json(folder, 201);
      })
      .get("/", async (c) => {
        await db.read();

        return c.json(db.data.folders);
      })
  )
	// Tags
  .route(
    "/tags",
    new Hono()
      .post("/", zValidator("json", z.object({
				name: z.string(),
			})), async (c) => {
        const { name } = c.req.valid("json");
        const tag: Tag = { id: crypto.randomUUID(), name };

        await db.update((data) => {
          data.tags.push(tag);
        });

        return c.json(tag, 201);
      })
      .get("/", async (c) => {
        await db.read();

        return c.json(db.data.tags);
      })
  );

export type AppType = typeof app;

export default app;
