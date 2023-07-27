import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

const dateFnsDirs = fs
  .readdirSync(path.join('.', 'node_modules', 'date-fns'))
  .map((d) => `date-fns/${d}`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        'headless-datepicker': resolve(__dirname, 'src/index.tsx'),
        jalali: resolve(__dirname, 'src/jalali/config.ts'),
      },
      // formats: ['es', 'umd'],
      // the proper extensions will be added
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: Object.keys(pkg.dependencies)
        .concat(Object.keys(pkg.peerDependencies))
        .concat(dateFnsDirs)
        .concat(['react/jsx-runtime']),
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
});
