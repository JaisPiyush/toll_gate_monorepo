import { defineConfig } from "tsup";

export default defineConfig([
  // 1) Edge build (ESM only, browser/worker safe)
  {
    entry: {
      index: "src/index.ts",
      edge: "src/edge.ts",
    },
    platform: "browser",
    format: ["esm"],
    target: "es2022",
    outDir: "dist/edge",
    dts: {
      entry: {
        index: "src/index.ts",
        edge: "src/edge.ts",
      },
    //   respectExternal: true
    },
    sourcemap: true,
    splitting: true,
    skipNodeModulesBundle: true,
    treeshake: true,
    clean: true,
    // conditions: ["browser", "worker"]
  },

  // 2) Node build (ESM + CJS, Node adapters allowed)
  {
    entry: {
      index: "src/index.ts",
      node: "src/node.ts",
    },
    platform: "node",
    format: ["esm", "cjs"],
    target: "node18",
    outDir: "dist/node",
    dts: {
      entry: {
        index: "src/index.ts",
        node: "src/node.ts",
      },
    //   respectExternal: true
    },
    sourcemap: true,
    splitting: false,
    skipNodeModulesBundle: true,
    treeshake: true,
    clean: false,
    outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".js" })
  }
]);
