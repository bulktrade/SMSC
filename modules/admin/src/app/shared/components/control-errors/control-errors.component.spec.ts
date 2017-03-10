import {TestBed, async} from "@angular/core/testing";
import {ComponentHelper} from "../../component-fixture";
import {ControlErrorsComponent, ControlErrorsModule} from "./control-errors.component";

describe('Component: ControlErrorsComponent', () => {
    let componentFixture: ComponentHelper<ControlErrorsComponent> =
        new ComponentHelper<ControlErrorsComponent>(null, null, null, null);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ControlErrorsModule],
        });

        componentFixture.fixture = TestBed.createComponent(ControlErrorsComponent);
        componentFixture.instance = componentFixture.fixture.componentInstance;
        componentFixture.element = componentFixture.fixture.nativeElement;
        componentFixture.debugElement = componentFixture.fixture.debugElement;
    });

    it('should get an error for username control', async(() => {
        componentFixture.instance.control = 'username';
        componentFixture.instance.errors = {required: 'This field is required.'};
        componentFixture.instance.form = <any>{
            controls: {
                username: {
                    dirty: true,
                    hasError: (err) => {
                        return true;
                    }
                }
            }
        };
        componentFixture.instance.findFirst();
        expect(componentFixture.instance.error).toEqual('This field is required.');
    }));
});
