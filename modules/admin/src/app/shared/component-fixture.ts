import {ComponentFixture} from "@angular/core/testing";
import {DebugElement} from "@angular/core";

export class ComponentHelper<T> {
    constructor(public fixture: ComponentFixture<T>,
                public instance: T,
                public element: any,
                public debugElement: DebugElement) {
    }
}
