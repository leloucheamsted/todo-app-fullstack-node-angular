import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiPrefixInterceptor } from './api-prefix.interceptor.service';

describe('ApiPrefixInterceptor (integration)', () => {
    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true }
            ]
        });
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should pass through absolute URLs unchanged', () => {
        http.get('https://example.com/api/data').subscribe();
        const req = httpMock.expectOne('https://example.com/api/data');
        expect(req.request.url).toBe('https://example.com/api/data');
        req.flush({});
    });

    it('should pass through icon URLs unchanged', () => {
        http.get('/assets/icons/icon.svg').subscribe();
        const req = httpMock.expectOne('/assets/icons/icon.svg');
        expect(req.request.url).toBe('/assets/icons/icon.svg');
        req.flush({});
    });

    it('should clone and pass through relative URLs', () => {
        http.get('/api/data').subscribe();
        const req = httpMock.expectOne('/api/data');
        expect(req.request.url).toBe('/api/data');
        req.flush({});
    });
});