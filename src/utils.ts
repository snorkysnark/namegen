const errorChecked = {
    unwrap: function<T>(nullable: T | null, error: string): T {
        if(nullable !== null) {
            return nullable as T;
        }
        throw new Error(error);
    },
    
    query: function(selector: string): Element {
        return this.unwrap(document.querySelector(selector), `Query failed: ${selector}`);
    }
}

const transform = {
    getCssPosition: function(element: Element): Vector2 {
        const matrixString = window.getComputedStyle(element).transform;
        const martix = matrixString.match(/[-]?\d+(\.\d+)?/g); //positive or negative floating point numbers
        let x = 0;
        let y = 0;
        if(martix && martix.length == 6) {
            x = +martix![4];
            y = +martix![5];
        }
        return {x, y};
    },
    
    getSvgPosition: function(element: SVGAElement): Vector2 {
        const matrix = element.transform.baseVal.getItem(0).matrix;
        let x = matrix.e;
        let y = matrix.f;
        return {x, y};
    }
}

const random = {
    itemFrom: function<T>(array: Array<T>): T {
        return array[this.rangeInt(0, array.length)];
    },

    filter: function<T>(array: Array<T>, atLeastOne?: boolean): Array<T> {
        let filtered =  array.filter((a) => Math.random() > 0.5);
        if(atLeastOne && filtered.length === 0) {
            filtered = [this.itemFrom(array)];
        }
        return filtered;
    },
    
    sort: function<T>(array: Array<T>): Array<T> {
        return array.sort((a, b) => Math.random() - 0.5);
    },
    
    rangeInt: function(min: number, max: number): number {
        return Math.floor(min + Math.random() * (max - min));
    },

    boolean: function(): boolean {
        return Math.random() < 0.5;
    },

    charFrom: function(chars: string): string {
        return chars.charAt(this.rangeInt(0, chars.length));
    },

    chance: function(chance: number): boolean {
        return Math.random() < chance;
    }
}

export interface Vector2 {x: number, y: number};
export {errorChecked, transform, random};