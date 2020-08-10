import path from 'path';

const projectDir = path.resolve("./");

function parseChunkId(id) {
    const pathInProject = path.relative(projectDir, id);
    const dirs = pathInProject.split(path.sep);

    const root = dirs[0];
    const pathInRoot = path.relative(root, pathInProject);
    return {
        root,
        relativePath: path.dirname(pathInRoot),
        name: path.parse(pathInRoot).name
    }
}

export {parseChunkId};