import { defineConfig } from 'vite';
import assemblyScriptPlugin from 'vite-plugin-assemblyscript-asc';
import react from '@vitejs/plugin-react';
import { comlink } from 'vite-plugin-comlink';
import ViteRestart from 'vite-plugin-restart'

const projectName = 'vite-react-comlink-worker-assemblyscript-webgpu-boilerplate';
export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  },

  base: `/${projectName}/`,

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
    comlink(),
    ViteRestart({
      restart: [
        'src/as/assembly/**/*.ts',
 ]
 })

  ],
  worker: {
    rollupOptions: {
      output: {
        format: "es",
      }
    },
    format: 'es',
    plugins: ()=>[
      comlink(),
    ]
  } as any,
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


