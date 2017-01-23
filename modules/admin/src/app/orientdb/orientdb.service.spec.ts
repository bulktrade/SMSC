// import { inject, TestBed } from '@angular/core/testing';
// import { ODatabaseService } from './orientdb.service';
// import { CRUD_PROVIDERS } from '../crud/common/crud-providers';
// import {
//     HttpModule,
//     Http,
//     ResponseOptions,
//     Response
// } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';
// import { APP_PROVIDERS } from '../app.module';
// import { HTTP_PROVIDERS } from '../common/mock/http-providers';
//
// describe('ODatabaseService', () => {
//
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             providers: [
//                 ...CRUD_PROVIDERS,
//                 ...APP_PROVIDERS,
//                 ...HTTP_PROVIDERS
//             ],
//             imports: [
//                 HttpModule
//             ]
//         });
//     });
//
//     it('should be defined authHttp', inject([ODatabaseService], (db) => {
//         expect(db.authHttp).toBeDefined();
//     }));
//
//     it('evalResponse should be is true', inject([ODatabaseService], (db) => {
//         expect(db.evalResponse).toBeTruthy();
//     }));
//
//     it('should to connect to orientdb', inject([MockBackend, Http, ODatabaseService],
//         (backend: MockBackend, http: Http, db: ODatabaseService) => {
//         let path = '/orientdb/connect/smsc';
//
//         backend.connections.subscribe(c => {
//             expect(c.request.url).toEqual(path);
//             let response = new ResponseOptions({ body: '{"result": "success"}' });
//             c.mockRespond(new Response(response));
//         });
//
//         db.open('test', 'test')
//             .then((res: Response) => {
//                 expect(res.json().result).toEqual('success');
//             });
//     }));
//
//     it('should get an error when connecting to orientdb',
//         inject([MockBackend, Http, ODatabaseService],
//         (backend: MockBackend, http: Http, db: ODatabaseService) => {
//         let path = '/orientdb/connect/smsc';
//         let error: Error = {
//             name: 'Error',
//             message: 'Bad Gateway'
//         };
//
//         backend.connections.subscribe(c => {
//             expect(c.request.url).toEqual(path);
//             c.mockError(error);
//         });
//
//         db.open('test', 'test')
//             .then(() => {
//             }, (err: Error) => {
//                 expect(err.name).toEqual('Error');
//             });
//     }));
//
//     it('should return a query result', inject([MockBackend, Http, ODatabaseService],
//         (backend: MockBackend, http: Http, db: ODatabaseService) => {
//         let path = '/orientdb/query/smsc/sql/select%20from%20Customer/20';
//
//         backend.connections.subscribe(c => {
//             expect(c.request.url).toEqual(path);
//             let response = new ResponseOptions({ body: '{"result": "success"}' });
//             c.mockRespond(new Response(response));
//         });
//
//         db.query('select from Customer')
//             .subscribe((res: Response) => {
//                 expect(res.json().result).toEqual('success');
//             });
//     }));
//
//     it('should get an error when getting result the method query',
//         inject([MockBackend, Http, ODatabaseService],
//             (backend: MockBackend, http: Http, db: ODatabaseService) => {
//                 let path = '/orientdb/query/smsc/sql/select%20from%20Customer/20';
//                 let error: Error = {
//                     name: 'Error',
//                     message: 'Bad Gateway'
//                 };
//
//                 backend.connections.subscribe(c => {
//                     expect(c.request.url).toEqual(path);
//                     c.mockError(error);
//                 });
//
//                 db.query('select from Customer')
//                     .subscribe(() => {
//                     }, (err: Error) => {
//                         expect(err.name).toEqual('Error');
//                     });
//             }));
//
//     it('should execute the command', inject([MockBackend, Http, ODatabaseService],
//         (backend: MockBackend, http: Http, db: ODatabaseService) => {
//         backend.connections.subscribe(c => {
//             let response = new ResponseOptions({ body: '{"result": "success"}' });
//             c.mockRespond(new Response(response));
//         });
//
//         db.command()
//             .subscribe((res: Response) => {
//                 expect(res.json().result).toEqual('success');
//             });
//     }));
//
//     it('should create a new user', inject([MockBackend, Http, ODatabaseService],
//         (backend: MockBackend, http: Http, db: ODatabaseService) => {
//         backend.connections.subscribe(c => {
//             let response = new ResponseOptions({ body: '{"result": "success"}' });
//             c.mockRespond(new Response(response));
//         });
//
//         db.create('root', '12t')
//             .subscribe((res: Response) => {
//                 expect(res.json().result).toEqual('success');
//             });
//     }));
//
//     it('should get an error when creating the user',
//         inject([MockBackend, Http, ODatabaseService],
//             (backend: MockBackend, http: Http, db: ODatabaseService) => {
//                 let error: Error = {
//                     name: 'Error',
//                     message: 'Bad Gateway'
//                 };
//
//                 backend.connections.subscribe(c => {
//                     c.mockError(error);
//                 });
//
//                 db.create('root', '12t')
//                     .subscribe(() => {
//                     }, (err: Error) => {
//                         expect(err.name).toEqual('Error');
//                     });
//             }));
//
//     it('should get the metadata', inject([MockBackend, Http, ODatabaseService],
//         (backend: MockBackend, http: Http, db: ODatabaseService) => {
//         let path = '/orientdb/database/smsc';
//
//         backend.connections.subscribe(c => {
//             expect(c.request.url).toEqual(path);
//             let response = new ResponseOptions({ body: '{"result": "success"}' });
//             c.mockRespond(new Response(response));
//         });
//
//         db.metadata()
//             .then((res: Response) => {
//                 expect(res.json().result).toEqual('success');
//             });
//     }));
//
//     it('should get an error when getting the metadata',
//         inject([MockBackend, Http, ODatabaseService],
//             (backend: MockBackend, http: Http, db: ODatabaseService) => {
//                 let path = '/orientdb/database/smsc';
//                 let error: Error = {
//                     name: 'Error',
//                     message: 'Bad Gateway'
//                 };
//
//                 backend.connections.subscribe(c => {
//                     expect(c.request.url).toEqual(path);
//                     c.mockError(error);
//                 });
//
//                 db.metadata()
//                     .then(() => {
//                     }, (err: Error) => {
//                         expect(err.name).toEqual('Error');
//                     });
//             }));
//
//     it('should return the record informations', inject([MockBackend, Http, ODatabaseService],
//         (backend: MockBackend, http: Http, db: ODatabaseService) => {
//         let body = {
//             '@rid': '1:1',
//             '@class': 'Address',
//             'street': 'Piazza Navona, 1',
//             'type': 'Residence',
//             'city': '#13:0'
//         };
//
//         backend.connections.subscribe(c => {
//             let response = new ResponseOptions({ body: JSON.stringify(body) });
//             c.mockRespond(new Response(response));
//         });
//
//         db.load('1:1')
//             .then((res: Response) => {
//                 expect(res.json()['@rid']).toEqual('1:1');
//             });
//     }));
//
//     it('should save the record', inject([MockBackend, Http, ODatabaseService],
//         (backend: MockBackend, http: Http, db: ODatabaseService) => {
//         let obj = JSON.stringify({
//             '@rid': '#1:1',
//             '@version': '1',
//             '@class': 'Customer'
//         });
//
//         backend.connections.subscribe(c => {
//             let response = new ResponseOptions({ body: '{"result": "success"}' });
//             c.mockRespond(new Response(response));
//         });
//
//         db.save(obj)
//             .subscribe((res: Response) => {
//                 expect(res.json().result).toEqual('success');
//             });
//     }));
//
// });
//
