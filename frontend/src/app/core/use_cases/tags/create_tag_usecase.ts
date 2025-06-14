import { Injectable } from "@angular/core";
import { IUseCase } from "../../../base/use-case";
import { TagsRepository } from "../../repositories/tags_repository";
import { Tag } from "../../../models/tag.model";

@Injectable({ providedIn: 'root' })
export class CreateTagUseCase implements IUseCase<string, Tag> {
    constructor(
        private repo: TagsRepository
    ) {
    }
    call(request: string): Promise<Tag> {
        try {
            return new Promise(async (resolve, reject) => {
                this.repo.createTag(request).subscribe((data: Tag) => {
                    resolve(data);
                });
            })
        } catch (e) {
            console.error(`Failed to create  tag${request}`, { request, e })
            throw e;
        }
    }
}