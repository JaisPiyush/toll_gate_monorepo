import { handleRequest, type MiddlewareOptions } from "../core";

/** Express/Koa-style adapter for Node 18+ */
export function expressMiddleware(opts: MiddlewareOptions = {}) {
  return async function (req: any, res: any, next?: (err?: any) => void) {
    try {
      const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
      const init: RequestInit = {
        method: req.method,
        headers: Object.fromEntries(
          Object.entries(req.headers).map(([k, v]) => [k, String(v)])
        ),
        body: ["GET", "HEAD"].includes(req.method) ? undefined : req.body
      };
      const response = await handleRequest(new Request(url, init), opts);

      res.status(response.status);
      response.headers.forEach((v, k) => res.setHeader(k, v));
      if (response.body) {
        const buf = Buffer.from(await response.arrayBuffer());
        res.send(buf);
      } else {
        res.end();
      }
    } catch (err) {
      if (next) return next(err);
      res.status(500).send("Internal error");
    }
  };
}
