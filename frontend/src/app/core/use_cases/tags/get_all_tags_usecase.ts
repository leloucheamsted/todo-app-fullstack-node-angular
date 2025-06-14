import { Injectable } from "@angular/core";
import { IUseCase } from "../../../base/use-case";
import { TagsRepository } from "../../repositories/tags_repository";
import { Tag } from "../../../models/tag.model";

@Injectable({ providedIn: 'root' })
export class GetAllTagsUseCase implements IUseCase<null, Tag[]> {
    constructor(
        private repo: TagsRepository
    ) {
    }
    call(request: null): Promise<Tag[]> {
        try {
            return new Promise(async (resolve, reject) => {
                this.repo.getAllTags().subscribe((data: Tag[]) => {
                    resolve(data);
                });
            })
        } catch (e) {
            console.error(`Failed to get all  tags${request}`, { request, e })
            throw e;
        }
    }
}