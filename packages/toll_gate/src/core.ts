export interface MiddlewareOptions {
    // Add shared options (API keys, flags, etc.)
  }
  
  export async function handleRequest(
    request: Request,
    _opts: MiddlewareOptions = {}
  ): Promise<Response> {
    const url = new URL(request.url);
  
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET,POST,OPTIONS",
          "access-control-allow-headers": "*"
        }
      });
    }
  
    if (url.pathname === "/health") {
      return Response.json({ ok: true, runtime: "universal" });
    }
  
    let body: unknown = null;
    try {
      if (request.headers.get("content-type")?.includes("application/json")) {
        body = await request.json();
      } else {
        const text = await request.text();
        body = text || null;
      }
    } catch {
      body = null;
    }
  
    return Response.json({
      message: "Hello from universal middleware",
      method: request.method,
      path: url.pathname,
      body
    });
  }
  