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
import { dataSource } from './data/data_source/data_source';
import { dataSourceImpl } from './data/data_source/data_source_impl';
import { TasksRepository } from './core/repositories/tasks_repository';
import { TasksRepositoryImpl } from './data/repositories/tasks_repository_impl';
import { CategoriesRepository } from './core/repositories/categories_repository';
import { CategoriesRepositoryImpl } from './data/repositories/categories_repository_impl';
import { TagsRepository } from './core/repositories/tags_repository';
import { TagsRepositoryImpl } from './data/repositories/tags_repository_impl';

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
        { provide: dataSource, useClass: dataSourceImpl },
        { provide: TasksRepository, useClass: TasksRepositoryImpl },
        { provide: CategoriesRepository, useClass: CategoriesRepositoryImpl },
        { provide: TagsRepository, useClass: TagsRepositoryImpl },
        { provide: NZ_I18N, useValue: en_US },
    ],
    bootstrap: [App],

})

export class AppModule { }
