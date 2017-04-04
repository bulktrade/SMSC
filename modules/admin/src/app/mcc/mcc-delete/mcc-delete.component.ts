import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

import {MCCService} from "../mcc.service";

@Component({
    selector: 'mcc-delete',
    template: '<delete-resource [id]="id" [crudRepository]="mccService" message="mcc.confirmDelete"></delete-resource>'
})
export class MCCDeleteComponent implements OnInit {

    public id: number;

    constructor(public route: ActivatedRoute,
                public mccService: MCCService) {
    }

    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
    }
}
