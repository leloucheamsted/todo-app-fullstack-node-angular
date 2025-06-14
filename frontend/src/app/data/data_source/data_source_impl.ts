import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { dataSource } from "./data_source";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Category } from "../../models/category.model";
import { Tag } from "../../models/tag.model";
import { Task } from "../../models/task.model";
import { InitData } from "../../models/init.model";
import { environment } from "../../../environments/environment";
import { generateRandomColor } from "../../utilities/utilities";

@Injectable({
    providedIn: 'root'
})
export class dataSourceImpl extends dataSource {


    _getUrl(): string {
        // USE .ENV FILE TO GET THE URL
        let url = environment.apiUrl
        return url;
    }

    constructor(private http: HttpClient) {
        super()
    }

    override initData(): Observable<InitData> {
        return this.http.get<InitData>(`${this._getUrl()}/tasks/init`);
    }
    override getAllCategories(): Observable<Category[]> {
        let categories$ = this.http.get<Category[]>(`${this._getUrl()}/categories`);
        return categories$.pipe(
            map(categories => {
                return categories.map((category: any) => ({
                    ...category,
                    color: category.color || generateRandomColor()
                }));
            })
        );
    }
    override createCategorie(CatName: string): Observable<Category> {
        return this.http.post<Category>(`${this._getUrl()}/categories`, { name: CatName });
    }
    override createTag(tagName: string): Observable<Tag> {
        return this.http.post<Tag>(`${this._getUrl()}/tags`, { name: tagName });
    }
    override getAllTags(): Observable<Tag[]> {
        return this.http.get<Tag[]>(`${this._getUrl()}/tags`);
    }
    override getAllTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this._getUrl()}/tasks`);
    }
    override getTaskById(id: number): Observable<Task> {
        return this.http.get<Task>(`${this._getUrl()}/tasks/${id}`);
    }
    override createTask(task: any): Observable<Task> {
        task.tagIds = task.tags
        console.log("Create Task", task);
        return this.http.post<Task>(`${this._getUrl()}/tasks`, task);
    }
    override updateTask(id: number, task: any): Observable<Task> {
        task.tagIds = task.tags;
        console.log("Update Task", task);
        return this.http.put<Task>(`${this._getUrl()}/tasks/${id}`, task);
    }
    override deleteTask(id: number): Observable<any> {
        return this.http.delete<any>(`${this._getUrl()}/tasks/${id}`);
    }

}