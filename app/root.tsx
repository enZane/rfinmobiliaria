import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "RF | Inmobiliaria",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en" className="bg-[#f6f6f6]">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          type="text/javascript"
          src="https://upload-widget.cloudinary.com/global/all.js"
        ></script>
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
