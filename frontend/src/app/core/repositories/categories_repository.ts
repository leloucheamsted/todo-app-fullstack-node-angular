import { Observable } from "rxjs";
import { Category } from "../../models/category.model";

export abstract class CategoriesRepository {
    abstract getAllCategories(): Observable<Category[]>;
    abstract createCategorie(CatName: string): Observable<Category>;
}