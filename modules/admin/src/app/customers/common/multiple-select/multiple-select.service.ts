import { Injectable } from "@angular/core";

@Injectable()
export class MultipleSelectService {

    constructor() {
    }

    getItems(data: Object[], byProperties: string[]) {
        let _data = [];

        data.forEach((item) => {
            let _item = [];

            _item.push({
                label: 'id',
                value: item['id']
            });

            byProperties.forEach(prop => {
                if (item.hasOwnProperty(prop)) {
                    _item.push({
                        label: prop,
                        value: item[prop]
                    });
                }
            });

            _data.push(_item);
        });

        return _data;
    }

}
