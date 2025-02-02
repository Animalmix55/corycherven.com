import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import postcssUrl from 'postcss-url';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';

const isDev = process.env.NODE_ENV === 'development';
const isServed = process.env.SERVE === 'true';

/** @type {import('rollup').RollupOptions} */
const options = {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
        format: 'system',
        sourcemap: true
    },
    external: ['react', 'react-dom', /^@cory/],
    plugins: [
        resolve({
            browser: true
        }),
        commonjs(),
        typescript(),
        image({
            // svg
            exclude: ['**/*.svg']
        }),
        postcss({
            plugins: [
                postcssUrl({
                    url: 'inline'
                })
            ]
        }),
        nodePolyfills({
            include: [/.yarn\/cache/, /node_modules/]
        }),
        replace({
            'process.env.NODE_ENV': isDev
                ? JSON.stringify('development')
                : JSON.stringify('production'),
            'process.version': JSON.stringify(process.version),
            preventAssignment: true
        }),

        // minify
        ...(isDev ? [] : [terser()]),

        // serve and livereload
        ...(isServed
            ? [
                  serve({
                      contentBase: 'dist',
                      port: 5001,
                      historyApiFallback: '/index.js',
                      headers: {
                          'Access-Control-Allow-Origin': '*'
                      }
                  })
              ]
            : [])
    ]
};

export default options;
