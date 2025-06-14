import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!/^(http|https):/i.test(request.url)) {
            if (request.url.includes("icons")) {
                return next.handle(request)
            }
            request = request.clone({ url: request.url });
        }

        return next.handle(request).pipe(
            finalize(() => {
                console.log("request finsh")
                // this.spinnerService.set(false);

            })
        );
    }
}