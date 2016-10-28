import { inject, TestBed } from '@angular/core/testing';
import {
    HttpModule,
    ResponseOptions,
    Response
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { GridPaginationComponent } from './grid-pagination.component';
import { CRUD_PROVIDERS } from '../../common/crud-providers';
import { APP_PROVIDERS } from '../../../app.module';
import { HTTP_PROVIDERS } from '../../../common/mock/http-providers';

describe('Grid Pagination', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ...CRUD_PROVIDERS,
                ...APP_PROVIDERS,
                ...HTTP_PROVIDERS,
                GridPaginationComponent,
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should go to the first page', inject([MockBackend, GridPaginationComponent],
        (backend: MockBackend, gp: GridPaginationComponent) => {
            gp.setCurrentPage(5);
            gp.className = 'GridPaginationComponent';
            gp.gridOptions = {
                rowSelection: 'multiple',
                rowHeight: 30,
                columnDefs: [],
                rowData: [],
            };

            backend.connections.subscribe(c => {
                let response = new ResponseOptions({ body: '{"result": "[]"}' });
                c.mockRespond(new Response(response));
            });

            gp.first();
            expect(gp.getCurrentPage()).toEqual(0);
        }));

    it('should go to the previous page', inject([MockBackend, GridPaginationComponent],
        (backend: MockBackend, gp: GridPaginationComponent) => {
            gp.setCurrentPage(5);
            gp.setPageSize(25);
            gp.className = 'GridPaginationComponent';
            gp.gridOptions = {
                rowSelection: 'multiple',
                rowHeight: 30,
                columnDefs: [],
                rowData: []
            };

            backend.connections.subscribe(c => {
                let response = new ResponseOptions({ body: '{"result": "[]"}' });
                c.mockRespond(new Response(response));
            });

            gp.previous();
            expect(gp.getCurrentPage()).toEqual(4);
        }));

    it('should go to the last page', inject([MockBackend, GridPaginationComponent],
        (backend: MockBackend, gp: GridPaginationComponent) => {
            gp.className = 'Test';
            gp.gridOptions = {
                rowSelection: 'multiple',
                rowHeight: 30,
                columnDefs: [],
                rowData: []
            };

            backend.connections.subscribe(c => {
                let response = new ResponseOptions({ body: '{"result": "[]"}' });
                c.mockRespond(new Response(response));
            });

            spyOn(gp, 'last');
            gp.last();
            expect(gp.last).toHaveBeenCalled();
        }));

    it('should to get a rows data', inject([MockBackend, GridPaginationComponent],
        (backend: MockBackend, gp: GridPaginationComponent) => {
            gp.className = 'Test';
            gp.gridOptions = {
                rowSelection: 'multiple',
                rowHeight: 30,
                columnDefs: [],
                rowData: []
            };

            backend.connections.subscribe(c => {
                let response = new ResponseOptions({ body: '{"result": "[]"}' });
                c.mockRespond(new Response(response));
            });

            spyOn(gp, 'changePageSize');
            gp.changePageSize(25);
            expect(gp.changePageSize).toHaveBeenCalled();
        }));

});

