import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";


@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

    constructor(public _router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {
                let handled: boolean = false;
                console.log('error is intercept')
                console.log(error)
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.error("Error Event");
                    }
                    else {

                        console.log(`error status : ${req.headers} ${error.statusText}`, req);
                        this.getServerErrorMessage(error, req);
                    }
                } else {
                    console.error("Other Errors");
                }

                if (handled) {
                    console.log('return back');
                }
                else {
                    return throwError(error)
                }
                return throwError(error.message)
            })
        )
    }

    private getServerErrorMessage(error: HttpErrorResponse, request: HttpRequest<any>): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 400: {
                if (request.url.includes('users') === true) {
                }
                return `Access Denied: ${error.message}`;


            }
            case 401: {
                return ``;
            }
            case 500: {

                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }

        }
    }
}
