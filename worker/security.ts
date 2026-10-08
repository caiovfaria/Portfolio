const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

export function isLocal(url: URL): boolean {
  return LOCAL_HOSTS.has(url.hostname);
}

export function contentSecurityPolicy(nonce: string): string {
  return [
    "default-src 'self'",
    // model-viewer uses WebAssembly; this does not permit JavaScript eval().
    `script-src 'self' 'nonce-${nonce}' 'wasm-unsafe-eval'`,
    "script-src-attr 'none'",
    // React's inline styles and model-viewer's shadow DOM need style attributes.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "worker-src 'self' blob:",
    "frame-src https://caiovfaria.github.io",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
  ].join("; ");
}

export function secureResponse(response: Response, url: URL, policy?: string): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  headers.delete("X-Powered-By");
  if (url.protocol === "https:" && !isLocal(url)) {
    headers.set("Strict-Transport-Security", "max-age=31536000");
  }
  if (policy && headers.get("content-type")?.includes("text/html")) {
    headers.set("Content-Security-Policy", policy);
    // A nonce is unique per response: never share cached HTML between visitors.
    headers.set("Cache-Control", "no-store");
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
