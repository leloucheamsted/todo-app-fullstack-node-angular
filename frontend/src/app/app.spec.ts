import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { Tasks } from './tasks/tasks';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { dataSourceImpl } from './data/data_source/data_source_impl';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { CategoriesRepository } from './core/repositories/categories_repository';
import { TagsRepository } from './core/repositories/tags_repository';
import { TasksRepository } from './core/repositories/tasks_repository';
import { CreateCategoriesUseCase } from './core/use_cases/categories/create_categorie_usecase';
import { GetAllCategoriesUseCase } from './core/use_cases/categories/get_all_categories_usecase';
import { CreateTagUseCase } from './core/use_cases/tags/create_tag_usecase';
import { GetAllTagsUseCase } from './core/use_cases/tags/get_all_tags_usecase';
import { CreateTaskUseCase } from './core/use_cases/tasks/create_task_usecase';
import { DeleteTaskUseCase } from './core/use_cases/tasks/delete_task_usecases';
import { GetAllTaskUseCase } from './core/use_cases/tasks/get_all_tasks_usecase';
import { GetTaskByIdUseCase } from './core/use_cases/tasks/get_task_by_id_usecase';
import { InitTasksUseCase } from './core/use_cases/tasks/init_tasks_usecase';
import { UpdateTaskUseCase } from './core/use_cases/tasks/update_task_usecase';
import { dataSource } from './data/data_source/data_source';
import { CategoriesRepositoryImpl } from './data/repositories/categories_repository_impl';
import { TagsRepositoryImpl } from './data/repositories/tags_repository_impl';
import { TasksRepositoryImpl } from './data/repositories/tasks_repository_impl';
import { ApiPrefixInterceptor } from './core/interceptors/api-prefix.interceptor.service';
import { DataService } from './core/services/data.service';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IconModule } from './icon.module';
import { TaskModule } from './tasks/tasks.module';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [App, Tasks],
      imports: [BrowserModule, BrowserAnimationsModule,
        RouterModule, HttpClientModule, MatIconModule, IconModule, TaskModule],

      providers: [
        HttpClient,
        DataService,
        { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },

        { provide: dataSource, useClass: dataSourceImpl },
        { provide: TasksRepository, useClass: TasksRepositoryImpl },
        { provide: CategoriesRepository, useClass: CategoriesRepositoryImpl },
        { provide: TagsRepository, useClass: TagsRepositoryImpl },
        { provide: NZ_I18N, useValue: en_US },


        // tasks  use cases
        { provide: GetAllTaskUseCase },
        { provide: InitTasksUseCase },
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
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
