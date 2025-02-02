import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copyPlugin from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import emitEjs from 'rollup-plugin-emit-ejs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const isDev = process.env.NODE_ENV === 'development';
const isServed = process.env.SERVE === 'true';

/** @type {import('rollup').RollupOptions} */
const options = {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'system',
        sourcemap: true
    },
    plugins: [
        resolve({
            browser: true
        }),
        commonjs(),
        // copy maps/*.json to dist/maps/*.json
        copyPlugin({
            targets: [{ src: 'maps/*.json', dest: 'dist/maps' }]
        }),
        typescript(),
        emitEjs({
            src: 'src',
            data: {
                isLocal: isDev
            }
        }),

        // minify
        ...(isDev ? [] : [terser()]),

        // serve and livereload
        ...(isServed
            ? [
                  serve({
                      open: true,
                      contentBase: 'dist',
                      port: 5000
                  }),
                  livereload({
                      watch: ['dist', 'maps']
                  })
              ]
            : [])
    ]
};

export default options;
