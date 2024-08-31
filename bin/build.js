import * as esbuild from "esbuild";

const isDev = process.argv.includes("--dev");

async function compile(options) {
  const context = await esbuild.context(options);

  if (isDev) {
    await context.watch();
  } else {
    await context.rebuild();
    await context.dispose();
  }
}

const defaultOptions = {
  define: {
    "process.env.NODE_ENV": isDev ? `'development'` : `'production'`,
  },
  bundle: true,
  mainFields: ["module", "main"],
  platform: "neutral",
  sourcemap: isDev ? "inline" : false,
  sourcesContent: isDev,
  treeShaking: true,
  target: ["es2020"],
  minify: !isDev,
  loader: {
    ".jpg": "dataurl",
    ".png": "dataurl",
    ".svg": "text",
    ".gif": "dataurl",
    ".woff": "file",
    ".woff2": "file",
    ".data": "base64",
  },
  plugins: [
    {
      name: "watchPlugin",
      setup: function (build) {
        build.onStart(() => {
          console.log(
            `Build started at ${new Date(Date.now()).toLocaleTimeString()}: ${
              build.initialOptions.outfile
            }`
          );
        });

        build.onEnd((result) => {
          if (result.errors.length > 0) {
            console.log(
              `Build failed at ${new Date(Date.now()).toLocaleTimeString()}: ${
                build.initialOptions.outfile
              }`,
              result.errors
            );
          } else {
            console.log(
              `Build finished at ${new Date(
                Date.now()
              ).toLocaleTimeString()}: ${build.initialOptions.outfile}`
            );
          }
        });
      },
    },
  ],
};

compile({
  ...defaultOptions,
  entryPoints: [`./resources/js/index.js`],
  outfile: `./dist/modalStore.js`,
});

compile({
  ...defaultOptions,
  entryPoints: [`./resources/js/observer.js`],
  outfile: `./dist/observer.js`,
});

compile({
  ...defaultOptions,
  entryPoints: [`./resources/js/swappable.js`],
  outfile: `./dist/swappable.js`,
});

compile({
  ...defaultOptions,
  entryPoints: [`./resources/js/search.js`],
  outfile: `./dist/search.js`,
});
