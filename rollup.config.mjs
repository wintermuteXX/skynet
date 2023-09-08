'use strict';

import fs from 'fs';
import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import screeps from 'rollup-plugin-screeps-world';

let cfg;
const dest = process.env.DEST;
if (!dest) {
  console.log('No destination specified - code will be compiled but not uploaded');
} else if ((cfg = JSON.parse(fs.readFileSync('./screeps.json'))[dest]) == null) {
  throw new Error('Invalid upload destination');
}

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/main.js',
    format: 'cjs',
    sourcemap: true
  },

  plugins: [
    clear({ targets: ['dist'] }),
    resolve({ rootDir: 'src' }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    screeps({ config: cfg, dryRun: cfg == null }),
    replace({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __BUILD_TIME__: Date.now(),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __REVISION__: git.short(),
    }),
  ]
};
