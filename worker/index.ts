/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { contentSecurityPolicy, isLocal, secureResponse } from "./security";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.protocol === "http:" && !isLocal(url)) {
      url.protocol = "https:";
      return secureResponse(new Response(null, { status: 308, headers: { Location: url.href } }), url);
    }

    // This portfolio has no server actions or form submission endpoints.
    // Reject writes before the framework parses an unnecessary request body.
    if (request.method !== "GET" && request.method !== "HEAD") {
      return secureResponse(new Response("Method not allowed", {
        status: 405, headers: { Allow: "GET, HEAD" },
      }), url);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return secureResponse(response, url);
    }

    // Go through the Worker even for assets so HTTP redirects apply everywhere.
    // ASSETS is a local binding (not an external request).
    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404) return secureResponse(asset, url);

    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(18))));
    const policy = contentSecurityPolicy(nonce);
    const requestHeaders = new Headers(request.headers);
    // Never accept a visitor-supplied nonce/policy as the server's own policy.
    requestHeaders.set("Content-Security-Policy", policy);
    requestHeaders.delete("Content-Security-Policy-Report-Only");
    const response = await handler.fetch(new Request(request, { headers: requestHeaders }), env, ctx);
    return secureResponse(response, url, policy);
  },
};

export default worker;
