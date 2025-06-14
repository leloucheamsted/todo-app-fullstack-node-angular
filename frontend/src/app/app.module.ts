import { APP_INITIALIZER, ErrorHandler, NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { App } from './app';
import { TaskModule } from './tasks/tasks.module';
import { IconModule } from './icon.module';
import { MatIconModule } from '@angular/material/icon';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiPrefixInterceptor } from './core/interceptors/api-prefix.interceptor.service';

const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};





@NgModule({

    declarations: [
        App,
    ],
    imports: [BrowserModule, BrowserAnimationsModule,
        RouterModule, HttpClientModule, MatIconModule, IconModule, TaskModule],


    providers: [
        HttpClient,
        { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
        { provide: NZ_I18N, useValue: en_US },
    ],
    bootstrap: [App],

})

export class AppModule { }
