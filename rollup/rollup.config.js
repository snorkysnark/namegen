import deleteFolder from './plugins/delete';
import manualResolve from './plugins/manualResolve';
import typescript from '@rollup/plugin-typescript';

import {parseChunkId} from './chunk';

const mainFile = "src/main.ts";
const outputFolder = "static/build";

export default {
    input: mainFile,
    output: {
        dir: outputFolder,
        format: "es",
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        manualChunks
    },
    plugins: [
        deleteFolder(outputFolder),
        manualResolve({
            "kute.js": "./node_modules/kute.js/dist/kute.esm.min.js"
        }),
        typescript()
    ]
}

function manualChunks(id) {
    const chunkInfo = parseChunkId(id);
    if(chunkInfo.root === "node_modules") {
        return "lib/" + chunkInfo.name;
    }
}