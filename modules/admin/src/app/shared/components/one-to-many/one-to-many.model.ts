/** which component need to show into tab */
export class Action {
    public static View = 'view';
    public static Create = 'create';
    public static Update = 'update';
    public static Delete = 'delete';
}

export class OneToMany {
    constructor(public propertyName: string,
                public action: string|Action,
                public entity?) {
    }
}
