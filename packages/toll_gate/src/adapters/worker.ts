import { handleRequest, type MiddlewareOptions } from "../core";

/** Cloudflare Worker adapter */
export function workerFetch(opts: MiddlewareOptions = {}) {
  return {
    async fetch(request: Request, env: unknown, ctx: any) {
      void env; void ctx;
      return handleRequest(request, opts);
    }
  };
}
