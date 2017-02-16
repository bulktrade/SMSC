/** which component need to show into tab */
export enum Action {
    View,
    Create,
    Update,
    Delete
}

export class OneToMany {
    constructor(public propertyName: string,
                public action: number|Action,
                public entity?) {
    }
}
