function unwrap<T>(nullable: T | null, error: string): T {
    if(nullable !== null) {
        return nullable as T;
    }
    throw new Error(error);
}

function querySelectorErr(selector: string, description?: string): Element {
    return unwrap(document.querySelector(selector), `Query failed: ${selector}`);
}

function getCssTransformPosition(element: Element): Vector2 {
    const matrixString = window.getComputedStyle(element).transform;
    const martix = matrixString.match(/[-]?\d+(\.\d+)?/g); //positive or negative floating point numbers
    let x = 0;
    let y = 0;
    if(martix && martix.length == 6) {
        x = +martix![4];
        y = +martix![5];
    }
    return {x, y};
}

function getSvgTransformPosition(element: SVGAElement): Vector2 {
    const matrix = element.transform.baseVal.getItem(0).matrix;
    let x = matrix.e;
    let y = matrix.f;
    return {x, y};
}

function randomFilter<T>(array: Array<T>): Array<T> {
    return array.filter((a) => Math.random() > 0.5);
}

function randomSort<T>(array: Array<T>): Array<T> {
    return array.sort((a, b) => Math.random() - 0.5);
}

export interface Vector2 {x: number, y: number};
export {unwrap, querySelectorErr, getCssTransformPosition, getSvgTransformPosition, randomFilter, randomSort};