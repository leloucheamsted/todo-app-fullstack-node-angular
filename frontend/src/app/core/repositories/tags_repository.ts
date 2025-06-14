import { Observable } from "rxjs";
import { Tag } from "../../models/tag.model";

export abstract class TagsRepository {
    abstract createTag(tagName: string): Observable<Tag>;
    abstract getAllTags(): Observable<Tag[]>;

}