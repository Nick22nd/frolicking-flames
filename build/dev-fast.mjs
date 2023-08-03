import * as esbuild from 'esbuild'

// const outFilePath = path.resolve(__dirname, '../demo/index.ts');
// const appPath = path.resolve(__dirname, '../demo/sample.ts')

let ctx = await esbuild.context({
    entryPoints: ['./demo/sample.ts'],
    outdir: './demo',
    bundle: true,
})

await ctx.watch()

let { host, port } = await ctx.serve({
    servedir: './demo',
})

// dev job
await esbuild.build({
    entryPoints: ['./demo/sample.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    outfile: './demo/index.js',
    
  })
console.log("start serve: http://127.0.0.1:%d", port )