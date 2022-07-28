import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
// import { ingredients } from 'src/app/Models/ingredients.model';
import { RecipesService } from 'src/app/Service/recipes.service';
export interface ingredients {
  food: string;
  foodCategory: string;
  foodId: string;
  image: string;
  measure: string;
  quantity: number;
  text: string;
  weight: number;
}
export interface digest {
  daily: number;
  hasRDI: boolean;
  label: string;
  schemaOrgTag: string;
  sub: string;
  tag: string;
  total: number;
  unit: string;
}
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  id: any;
  selectedRecipe: any;
  Recipe: any;
  ingredients!: ingredients[];
  digest: any;
  displayedColumns: string[] = [
    'food',
    'weight',
    'quantity',
    'measure',
    'text',
  ];
  displayedColumns1: string[] = ['label', 'tag', 'total', 'unit'];
  ngredientLines: any;
  dataSource: MatTableDataSource<ingredients> = new MatTableDataSource();
  dataSource1: MatTableDataSource<digest> = new MatTableDataSource();
  @ViewChild(MatPaginator)
  obs!: Observable<any>;
  pageEvent!: PageEvent;
  paginator!: MatPaginator;
  constructor(private route: ActivatedRoute, private recipe: RecipesService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });
    this.recipe.getSingleRecipe(this.id).subscribe((rea) => {
      this.selectedRecipe = rea;
      this.Recipe = this.selectedRecipe.recipe;
      this.ingredients = this.selectedRecipe.recipe.ingredients;
      this.digest = this.selectedRecipe.recipe.digest;
      this.dataSource.data = this.ingredients;
      this.dataSource1.data = this.digest;
      this.dataSource.paginator = this.paginator;
      this.dataSource1.paginator = this.paginator;
    });
  }
}
