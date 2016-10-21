import { Component } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { CrudService } from './crud.service';

@Component({
    selector: 'crud',
    template: require('./crud.component.html'),
    styleUrls: [
        require('./crud.scss')
    ],
    providers: []
})

export class CrudComponent {

    constructor(public translate: TranslateService,
                public route: ActivatedRoute,
                public router: Router,
                public crudService: CrudService) {
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                this.crudService.hideAllMessageBoxes();
            }
        });
    }

    ngOnDestroy() {
        this.crudService.resetCrudLevels();
    }

}
