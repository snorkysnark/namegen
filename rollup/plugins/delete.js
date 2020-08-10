import fs from 'fs';

export default function deleteFolder(path) {
    return {
        name: "delete",
        generateBundle() {
            fs.rmdirSync(path, {recursive: true});
        }
    }
}