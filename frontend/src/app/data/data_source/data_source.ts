import { Observable } from "rxjs";
import { Category } from "../../models/category.model";
import { Tag } from "../../models/tag.model";
import { Task } from "../../models/task.model";
import { InitData } from "../../models/init.model";

export abstract class dataSource {
    abstract getAllCategories(): Observable<Category[]>;
    abstract createCategorie(CatName: string): Observable<Category>;
    abstract createTag(tagName: string): Observable<Tag>;
    abstract getAllTags(): Observable<Tag[]>;
    abstract initData(): Observable<InitData>;

    abstract getAllTasks(): Observable<Task[]>;
    abstract getTaskById(id: number): Observable<Task>;
    abstract createTask(task: any): Observable<Task>;
    abstract updateTask(id: number, task: Task): Observable<Task>;
    abstract deleteTask(id: number): Observable<any>;
}