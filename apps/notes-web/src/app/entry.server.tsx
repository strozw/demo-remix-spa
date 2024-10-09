import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  _responseHeaders: Headers,
  remixContext: EntryContext
) {
  const appHtml = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root">${appHtml}</div>
      </body>
    </html>
`;

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
    status: responseStatusCode,
  });
}
