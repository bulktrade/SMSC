export class Mock {
    static mock(constr?, name?) {
        let keys = [];

        if (constr !== undefined) {
            constr.forEach((item, key, arr) => {
                keys.push(key);
            });
        }

        return keys.length > 0 ? jasmine.createSpyObj( name || 'mock', keys ) : {};
    };
}
