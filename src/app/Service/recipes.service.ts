import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private http: HttpClient) {}
  uri = `https://api.edamam.com/api/recipes/v2?type=public&q=all&app_id=505610ec&app_key=8125ef8d3b23eb5157acd52169dc1acc&random=true&count=100`;
  getRecipe(cuisine: string | null) {
    if (cuisine) {
      this.uri += `&cuisineType=${cuisine}`;
    }
    return this.http.get(this.uri).pipe(
      map((res: any) => {
        return res.hits.map((recipe: any) => {
          let id = recipe.recipe.uri.split('_')[1];
          return {
            ...recipe.recipe,
            id: id,
          };
        });
      })
    );
  }

  getSingleRecipe(Id: number) {
    return this.http.get(
      `https://api.edamam.com/api/recipes/v2/${Id}?type=public&q=all&app_id=505610ec&app_key=8125ef8d3b23eb5157acd52169dc1acc`
    );
  }

  getrecipe(data: string) {
    let uri = `https://api.edamam.com/api/recipes/v2?type=public&app_id=505610ec&app_key=8125ef8d3b23eb5157acd52169dc1acc&random=true&count=100`;
    if (data) {
      this.uri += `&q=${data}`;
    }
    return this.http
      .get(uri, {
        params: {
          action: 'query',
          format: 'json',
          q: data,
        },
      })
      .pipe(
        map((res: any) => {
          return res.hits.map((recipe: any) => {
            let id = recipe.recipe.uri.split('_')[1];
            return {
              ...recipe.recipe,
              id: id,
            };
          });
        })
      );
  }
}
