import { Injectable } from "@angular/core";
import { IUseCase } from "../../../base/use-case";
import { Category } from "../../../models/category.model";
import { CategoriesRepository } from "../../repositories/categories_repository";

@Injectable({ providedIn: 'root' })
export class CreateCategoriesUseCase implements IUseCase<string, Category> {
    constructor(
        private repo: CategoriesRepository
    ) {
    }
    call(request: string): Promise<Category> {
        try {
            return new Promise(async (resolve, reject) => {
                this.repo.createCategorie(request).subscribe((data: Category) => {
                    resolve(data);
                });
            })
        } catch (e) {
            console.error(`Failed to create all  categorie${request}`, { request, e })
            throw e;
        }
    }
}