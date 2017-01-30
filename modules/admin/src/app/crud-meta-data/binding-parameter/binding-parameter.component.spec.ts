import { inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MetaDataPropertyBindingParameterComponent } from './binding-parameter.component';
import { TranslateModule } from "ng2-translate";

describe('MetaDataPropertyBindingParameterComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MetaDataPropertyBindingParameterComponent,
            ],
            imports: [
                HttpModule,
                TranslateModule.forRoot()
            ]
        });
    });

    it('should be translate', inject([MetaDataPropertyBindingParameterComponent],
        (metaDataPropertyBindingParameter) => {
            expect(!!metaDataPropertyBindingParameter.translate).toEqual(true);
        }));
});
