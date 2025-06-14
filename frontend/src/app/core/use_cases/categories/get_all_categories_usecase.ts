import { Injectable } from "@angular/core";
import { IUseCase } from "../../../base/use-case";
import { Category } from "../../../models/category.model";
import { CategoriesRepository } from "../../repositories/categories_repository";

@Injectable({ providedIn: 'root' })
export class GetAllCategoriesUseCase implements IUseCase<null, Category[]> {
    constructor(
        private repo: CategoriesRepository
    ) {
    }
    call(request: null): Promise<Category[]> {
        try {
            return new Promise(async (resolve, reject) => {
                this.repo.getAllCategories().subscribe((data: Category[]) => {
                    resolve(data);
                });
            })
        } catch (e) {
            console.error(`Failed to get all  categories${request}`, { request, e })
            throw e;
        }
    }
}