function unwrap<T>(nullable: T | null, error: string): T {
    if(nullable !== null) {
        return nullable as T;
    }
    throw new Error(error);
}

function querySelectorErr(selector: string, description?: string): Element {
    return unwrap(document.querySelector(selector), `Query failed: ${selector}`);
}

function div(content: string, options?: {id?: string, class?: string}): HTMLDivElement {
    let element = document.createElement("div");
    element.innerHTML = content;
    if(options) {
        if(options.id) element.setAttribute("id", options.id);
        if(options.class) element.setAttribute("class", options.class);
    }
    return element;
}

export {unwrap, querySelectorErr, div};