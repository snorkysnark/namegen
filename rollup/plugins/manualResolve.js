import path from 'path';

export default function manualResolve(modulePaths) {
    return {
        name: "manual-resolve",
        resolveId(id) {
            if(modulePaths[id]) {
                return path.resolve(modulePaths[id]);
            }
            return null;
        }
    }
}