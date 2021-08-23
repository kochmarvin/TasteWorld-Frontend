import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {

    private baseURL = 'http://localhost:3000/recipes/';

    constructor(private http: HttpClient, private router: Router) { }

    public getRecipesByName(name: string): Observable<any> {
        return this.http.post(this.baseURL + 'find-by-name', { name });
    }

    public getRecipesByIngredients(ingredients: any): Observable<any> {
        return this.http.post(this.baseURL + 'find-by-ingredients', { ingredients });
    }

    public getRecipesOfUser(id: string): Observable<any> {
        return this.http.get(this.baseURL + 'get-user-recipes/' + id);
    }

    public getRecipeById(id: string): Observable<any> {
        return this.http.get(this.baseURL + id);
    }

    public createRecipe(name: string, preperation: string, ingredients: any[], persons: number, duration: string, file: any): Observable<any> {
        const body = new FormData();
        const data = { preperation: preperation, name: name, ingredients: ingredients, persons: persons, duration: duration };

        body.append('data', JSON.stringify(data));
        body.append('image', file);

        return this.http.post(this.baseURL + 'create-recipe', body);
    }

}
