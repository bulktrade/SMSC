// import { inject, TestBed } from '@angular/core/testing';
// import { CrudUpdateComponent } from './crud-update.component';
// import { CRUD_PROVIDERS } from '../common/crud-providers';
// import { Location } from '@angular/common';
// import { HttpModule } from '@angular/http';
//
// class MockLocation {};
//
// describe('CrudComponent Edit', () => {
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             providers: [
//                 ...CRUD_PROVIDERS,
//                 CrudUpdateComponent,
//                 { provide: Location, useClass: MockLocation }
//             ],
//             imports: [
//                 HttpModule
//             ]
//         });
//     });
//
//     it('should be defined grid options', inject([ CrudUpdateComponent ], (crudEdit) => {
//         expect(crudEdit.crudService.gridOptions).toBeDefined();
//     }));
//
//     it('should be location', inject([ CrudUpdateComponent ], (crudEdit) => {
//         expect(!!crudEdit.location).toEqual(true);
//     }));
//
//     it('should be columnDefs', inject([ CrudUpdateComponent ], (crudEdit) => {
//         expect(crudEdit.crudService.gridOptions.hasOwnProperty('columnDefs')).toBeTruthy();
//     }));
//
//     it('should be rowData', inject([ CrudUpdateComponent ], (crudEdit) => {
//         expect(crudEdit.crudService.gridOptions.hasOwnProperty('rowData')).toBeTruthy();
//     }));
//
// });
