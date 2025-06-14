import { Injectable } from "@angular/core";
import { CategoriesRepository } from "../../core/repositories/categories_repository";
import { Observable } from "rxjs";
import { Category } from "../../models/category.model";
import { dataSource } from "../data_source/data_source";

@Injectable()
export class CategoriesRepositoryImpl extends CategoriesRepository {


    constructor(private source: dataSource) {
        super();
    }

    override getAllCategories(): Observable<Category[]> {
        return this.source.getAllCategories();
    }
    override createCategorie(CatName: string): Observable<Category> {
        return this.source.createCategorie(CatName);
    }

}