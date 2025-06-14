import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs';
import { ApiPrefixInterceptor } from './api-prefix.interceptor.service';

describe('ApiPrefixInterceptor', () => {
    let interceptor: ApiPrefixInterceptor;
    let httpHandlerSpy: jasmine.SpyObj<HttpHandler>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ApiPrefixInterceptor]
        });
        interceptor = TestBed.inject(ApiPrefixInterceptor);
        httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
        httpHandlerSpy.handle.and.returnValue(of({} as HttpEvent<any>));
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should pass through absolute URLs unchanged', (done) => {
        const req = new HttpRequest('GET', 'https://example.com/api/data');
        interceptor.intercept(req, httpHandlerSpy).subscribe(() => {
            expect(httpHandlerSpy.handle).toHaveBeenCalledWith(req);
            done();
        });
    });

    it('should pass through icon URLs unchanged', (done) => {
        const req = new HttpRequest('GET', '/assets/icons/icon.svg');
        interceptor.intercept(req, httpHandlerSpy).subscribe(() => {
            expect(httpHandlerSpy.handle).toHaveBeenCalledWith(req);
            done();
        });
    });

    it('should clone and pass through relative URLs', (done) => {
        const req = new HttpRequest('GET', '/api/data');
        interceptor.intercept(req, httpHandlerSpy).subscribe(() => {
            expect(httpHandlerSpy.handle).toHaveBeenCalled();
            done();
        });
    });
});