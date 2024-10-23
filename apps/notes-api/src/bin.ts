import { parseArgs } from "node:util";
import { serve } from "@hono/node-server";
import { app } from ".";

const defaultPort = Number(process.env.NOTES_API_PORT) || 3000;

const { values } = parseArgs({
  options: {
    port: {
      type: "string",
      short: "p",
      default: String(defaultPort),
    },
  },
});

const port = Number(values.port || defaultPort);

serve(
  {
    fetch: app.fetch,
    port,
    overrideGlobalObjects: false,
  },
  () => {
    console.log(`notes-api server was started on port ${port}`);
  }
);
