import { TestBed } from '@angular/core/testing';
import { GlobalHttpInterceptorService } from './global-http.interceptor.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('GlobalHttpInterceptorService', () => {
    let interceptor: GlobalHttpInterceptorService;
    let routerSpy: jasmine.SpyObj<Router>;
    let httpHandlerSpy: jasmine.SpyObj<HttpHandler>;

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

        TestBed.configureTestingModule({
            providers: [
                GlobalHttpInterceptorService,
                { provide: Router, useValue: routerSpy }
            ]
        });

        interceptor = TestBed.inject(GlobalHttpInterceptorService);
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should handle HttpErrorResponse with status 404', (done) => {
        const req = new HttpRequest('GET', '/api/test');
        const error = new HttpErrorResponse({ status: 404, statusText: 'Not Found', url: '/api/test', error: {} });
        httpHandlerSpy.handle.and.returnValue(throwError(() => error));

        interceptor.intercept(req, httpHandlerSpy).subscribe({
            error: (err) => {
                expect(err.status).toBe(404);
                done();
            }
        });
    });

    it('should handle HttpErrorResponse with status 500', (done) => {
        const req = new HttpRequest('GET', '/api/test');
        const error = new HttpErrorResponse({ status: 500, statusText: 'Server Error', url: '/api/test', error: {} });
        httpHandlerSpy.handle.and.returnValue(throwError(() => error));

        interceptor.intercept(req, httpHandlerSpy).subscribe({
            error: (err) => {
                expect(err.status).toBe(500);
                done();
            }
        });
    });

    it('should pass through successful requests', (done) => {
        const req = new HttpRequest('GET', '/api/test');
        httpHandlerSpy.handle.and.returnValue(of({} as HttpEvent<any>));

        interceptor.intercept(req, httpHandlerSpy).subscribe({
            next: (event) => {
                expect(event).toBeTruthy();
                done();
            }
        });
    });
});