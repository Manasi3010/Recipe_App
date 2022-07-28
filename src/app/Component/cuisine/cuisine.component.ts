import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/Models/Recipe.model';
import { RecipesService } from 'src/app/Service/recipes.service';

@Component({
  selector: 'app-cuisine',
  templateUrl: './cuisine.component.html',
  styleUrls: ['./cuisine.component.css'],
})
export class CuisineComponent implements OnInit {
  cuisine!: string | null;
  recipe: Recipe[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  obs!: Observable<any>;
  pageEvent!: PageEvent;
  searchText: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private service: RecipesService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    let cuisinetype = this.route.snapshot.paramMap.get('cuisineType');
    this.cuisine = cuisinetype;
    // console.log(this.cuisine);
    this.route.params.subscribe((param) => {
      this.cuisine = param['cuisineType'];
    });
    this.service.getRecipe(this.cuisine).subscribe((data) => {
      this.recipe = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.cuisine = '';
    });
  }
}
