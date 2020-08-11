function unwrap<T>(nullable: T | null, error: string): T {
    if(nullable !== null) {
        return nullable as T;
    }
    throw new Error(error);
}

function querySelectorErr(selector: string, description?: string): Element {
    return unwrap(document.querySelector(selector), `Query failed: ${selector}`);
}

function getTransformPosition(element: Element): {x: number, y: number} {
    const matrixString = window.getComputedStyle(element).transform;
    const numbers = matrixString.match(/[-]?\d+/g);
    let x = 0;
    let y = 0;
    if(numbers && numbers.length == 6) {
        x = +numbers![4];
        y = +numbers![5];
    }
    return {x, y};
}

export {unwrap, querySelectorErr, getTransformPosition};