import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiPrefixInterceptor } from "./api-prefix.interceptor.service";


export const interceptorProvider = [
    { providde: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
];