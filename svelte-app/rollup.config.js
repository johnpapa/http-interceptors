import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

const heroion = !process.env.ROLLUP_WATCH;
const api = 'http://localhost:7071/api';
const API = process.env.API || heroion ? '/api' : api;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        },
      );

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    replace({
      // 2 level deep object should be stringify
      process: JSON.stringify({
        env: {
          DEV: !heroion,
          SVELTE_APP_API: API,
        },
      }),
      preventAssignment: true,
    }),
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !heroion }),
      compilerOptions: {
        // enable run-time checks when not in heroion
        dev: !heroion,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    postcss({ extract: 'bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),
    typescript({
      sourceMap: !heroion,
      inlineSources: !heroion,
    }),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !heroion && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in heroion
    !heroion && livereload('public'),

    // If we're building for heroion (npm run build
    // instead of npm run dev), minify
    heroion && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
