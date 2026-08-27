import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Dev-only. Next blocks cross-origin requests to dev assets (/_next/static,
     /_next/hmr) from any host other than the one the server was started on,
     which is `localhost`. Browsing the dev server as 127.0.0.1 is a different
     origin by that rule, so the HTML rendered but every chunk and the HMR
     socket were refused — a page that looks right and does nothing. Has no
     effect on `next build` or production. */
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
