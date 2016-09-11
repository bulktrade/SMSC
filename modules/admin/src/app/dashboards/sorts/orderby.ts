import { Pipe } from "@angular/core";

@Pipe({
    name: 'orderby'
})
export class OrderBy{
    transform(array:Array<any>, args?:Object):Array<any>{
        array.sort((a: any, b:any) => {
            if(args['key'] != undefined){
                a = a[args['key']];
                b = b[args['key']];
            }

                //  Default direction - descending
            switch(args['direction']){
                case 'ascending':
                    if(a < b){
                        return -1;
                    }

                    if(a > b){
                        return 1;
                    }

                    return 0;
                default:
                    if(a > b){
                        return -1;
                    }

                    if(a < b){
                        return 1;
                    }

                    return 0;
            }
        });

        return array;
    }
}
