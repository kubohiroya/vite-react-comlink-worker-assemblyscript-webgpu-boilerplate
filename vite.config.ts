import { defineConfig } from 'vite';
import assemblyScriptPlugin from 'vite-plugin-assemblyscript-asc';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from "vite-plugin-top-level-await";
import react from '@vitejs/plugin-react';
import ViteRestart from 'vite-plugin-restart'

const projectName = 'vite-react-promise-worker-assemblyscript-boilerplate';
export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  },

  base: `/${projectName}`,

  resolve: {
    alias: {
    },
  },

  plugins: [
    react(),
    assemblyScriptPlugin({
      projectRoot: '.',
      configFile: 'asconfig.json',
      srcMatch: 'src/as/assembly',
      srcEntryFile: 'src/as/assembly/index.ts',
      targetWasmFile: `./build/${projectName}/assets/index.wasm`,
      distFolder: 'dist',
    }) as any,
      wasm(),
      topLevelAwait(),
    ViteRestart({
      restart: [
        'src/as/assembly/**/*.ts',
      ]
    }),
  ],
  worker: {
    format: 'es',
  },
  build: {
    target: 'esnext',
    outDir: `./dist/${projectName}`,
    emitAssets: true,
    rollupOptions: {
      external: [
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      input: {
        main: 'index.html',
      },
    },
  },
});
