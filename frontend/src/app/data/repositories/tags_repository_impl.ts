import { Injectable } from "@angular/core";
import { TasksRepository } from "../../core/repositories/tasks_repository";
import { Observable } from "rxjs";
import { Task } from "../../models/task.model";
import { dataSource } from "../data_source/data_source";
import { TagsRepository } from "../../core/repositories/tags_repository";
import { Tag } from "../../models/tag.model";

@Injectable()
export class TagsRepositoryImpl extends TagsRepository {


    constructor(private source: dataSource) {
        super();
    }
    override createTag(tagName: string): Observable<Tag> {
        return this.source.createTag(tagName);
    }
    override getAllTags(): Observable<Tag[]> {
        return this.source.getAllTags();
    }


}
