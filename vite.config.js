import solid from "solid-start/vite";
import solidStatic from "solid-start-static";

import { defineConfig } from "vite";
export default defineConfig({
  base: "/BESAMEL-DOCS/",
  plugins: [
    {
      ...(await import("@mdx-js/rollup")).default({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
      }),
      enforce: "pre",
    },
    solid({ adapter: solidStatic() }),

  ],
});
