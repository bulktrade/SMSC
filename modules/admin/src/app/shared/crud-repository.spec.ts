import {TestBed, inject} from "@angular/core/testing";
import {HttpModule, XHRBackend, Http, ResponseOptions, Response} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {CrudRepository} from "./crud-repository";
import {ConfigService} from "../config/config.service";
import {CustomersService} from "../customers/customer.service";
import {Entity} from "./entity.model";

interface Data extends Entity {
    name: string;
    telephoneNumber: string;
}

class CrudRepositoryService extends CrudRepository<Data> {
    public repositoryName = 'data';
    public titleColumns = 'name';

    constructor(public http: Http,
                public configService: ConfigService) {
        super(http, configService);
    }
}

class ConfigServiceMock {
    config = {
        "apiUrl": "/rest",
        "i18nPath": "assets/i18n",
        "debug": false
    }
}

describe('Crud repository', () => {
    let mockBackend, service: CrudRepositoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                {provide: XHRBackend, useClass: MockBackend},
                {provide: ConfigService, useClass: ConfigServiceMock},
                CustomersService
            ]
        })
    });

    beforeEach(inject([CustomersService, XHRBackend], (_service, _mockBackend) => {
        service = _service;
        mockBackend = _mockBackend;
    }));

    it('should create the new resource', () => {
        let responseData = {
            name: 'mock',
            telephoneNumber: '0986523476'
        };
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: responseData});
            connection.mockRespond(new Response(response));
        });
        service.createResource(responseData)
            .subscribe((data: Data) => {
                expect(data.name).toEqual(responseData.name);
                expect(data.telephoneNumber).toEqual(responseData.telephoneNumber);
            });
    });

    it('should update the resource', () => {
        let responseData: Data = {
            name: 'mock',
            telephoneNumber: '0986523476',
            _links: {self: {href: 'link'}}
        };
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: responseData});
            connection.mockRespond(new Response(response));
        });
        service.updateResource(responseData)
            .subscribe((data: Data) => {
                expect(data.name).toEqual(responseData.name);
                expect(data.telephoneNumber).toEqual(responseData.telephoneNumber);
            });
    });

    it('should delete the resource', () => {
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({status: 204, statusText: 'NO CONTENT'});
            connection.mockRespond(new Response(response));
        });
        service.deleteResourceById(1)
            .subscribe((res: Response) => {
                expect(res.status).toEqual(204);
                expect(res.statusText).toEqual('NO CONTENT');
            });
    });

    it('should get a single resource', () => {
        let responseData: Data = {
            name: 'mock',
            telephoneNumber: '0986523476',
            _links: {self: {href: 'link'}}
        };
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: responseData});
            connection.mockRespond(new Response(response));
        });
        service.getResourceById(1)
            .subscribe((data: Data) => {
                expect(data.name).toEqual(responseData.name);
                expect(data.telephoneNumber).toEqual(responseData.telephoneNumber);
            });
    });

    it('should get a list of resources', () => {
        let responseData: Data[] = [
            {
                name: 'mock',
                telephoneNumber: '0986523476',
                _links: {self: {href: 'link'}}
            },
            {
                name: 'mock2',
                telephoneNumber: '0986523476',
                _links: {self: {href: 'link'}}
            }
        ];
        mockBackend.connections.subscribe(connection => {
            let response = new ResponseOptions({body: responseData});
            connection.mockRespond(new Response(response));
        });
        service.getResources()
            .subscribe((data: Data[]) => {
                expect(data[0].name).toEqual(responseData[0].name);
                expect(data[0].telephoneNumber).toEqual(responseData[0].telephoneNumber);
                expect(data[1].name).toEqual(responseData[1].name);
                expect(data[1].telephoneNumber).toEqual(responseData[1].telephoneNumber);
            });
    });
});
