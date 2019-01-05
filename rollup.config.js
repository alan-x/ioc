import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import pkg from './package.json';

export default [
    // browser-friendly UMD build
    {
        input: 'lib/Ioc.ts',
        output: {
            name: 'Ioc',
            file: 'dist/ioc.bundle.js',
            format: 'umd'
        },
        plugins: [
            resolve(),   // so Rollup can find `ms`
            commonjs(),  // so Rollup can convert `ms` to an ES module
            typescript() // so Rollup can convert TypeScript to JavaScript
        ]
    },

];
