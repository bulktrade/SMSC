export class Mock {
    static mock(constr?, name?) {
        var keys = [];
        for(var key in constr) {
            keys.push(key);
        }

        return keys.length > 0 ? jasmine.createSpyObj( name || "mock", keys ) : {};
    };
}
