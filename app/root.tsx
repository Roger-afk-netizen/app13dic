import { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import globalStylesUrl from "~/styles/global.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStylesUrl }];
};

export function meta() {
  return {
    charset: "utf-8",
    title: "Remix Pokémon",
    viewport: "width=device-width,initial-scale=1",
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
