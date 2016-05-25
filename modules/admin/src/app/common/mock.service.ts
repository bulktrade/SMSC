export class Mock {
    static mock(constr?, name?) {
        let keys = [];
        for (let key in constr) {
            // if (constr.hasOwnProperty(key)) {
                keys.push(key);
            // }
        }

        return keys.length > 0 ? jasmine.createSpyObj( name || 'mock', keys ) : {};
    };
}
