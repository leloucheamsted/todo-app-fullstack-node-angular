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
import { GetAllTaskUseCase } from './core/use_cases/tasks/get_all_tasks_usecase';
import { DeleteTaskUseCase } from './core/use_cases/tasks/delete_task_usecases';
import { CreateTaskUseCase } from './core/use_cases/tasks/create_task_usecase';
import { GetTaskByIdUseCase } from './core/use_cases/tasks/get_task_by_id_usecase';
import { UpdateTaskUseCase } from './core/use_cases/tasks/update_task_usecase';
import { GetAllCategoriesUseCase } from './core/use_cases/categories/get_all_categories_usecase';
import { CreateCategoriesUseCase } from './core/use_cases/categories/create_categorie_usecase';
import { GetAllTagsUseCase } from './core/use_cases/tags/get_all_tags_usecase';
import { CreateTagUseCase } from './core/use_cases/tags/create_tag_usecase';

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


        // tasks  use cases
        { provide: GetAllTaskUseCase },
        { provide: DeleteTaskUseCase },
        { provide: CreateTaskUseCase },
        { provide: GetTaskByIdUseCase },
        { provide: UpdateTaskUseCase },

        // categories use cases
        { provide: GetAllCategoriesUseCase },
        { provide: CreateCategoriesUseCase },

        // tags use cases
        { provide: GetAllTagsUseCase },
        { provide: CreateTagUseCase }

    ],
    bootstrap: [App],

})

export class AppModule { }
