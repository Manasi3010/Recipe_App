import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, VirtualTimeScheduler } from 'rxjs';
import { Recipe } from 'src/app/Models/Recipe.model';
import { RecipesService } from 'src/app/Service/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recipe: Recipe[] = [];
  displayedColumns: string[] = ['Id', 'Title'];

  q: string = 'all';
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSource1: MatTableDataSource<any> = new MatTableDataSource();
  obs!: Observable<any>;
  obs1!: Observable<any>;
  pageEvent!: PageEvent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchText: string = '';
  cuisine!: string | null;
  cuisineType = [];
  getquery!: string;
  result: any;
  constructor(
    private http: HttpClient,
    private service: RecipesService,
    private route: ActivatedRoute
  ) {}

  // fetchResults(sym: any) {
  //   this.http.get<any>(`${this.service.uri}&q=${sym}`);
  // }
  ngOnInit(): void {
    let cuisinetype = this.route.snapshot.paramMap.get('cuisineType');
    this.cuisine = cuisinetype;
    this.route.paramMap.subscribe((param) => {
      this.cuisine = param.get('cuisineType');
    });
    this.service.getRecipe(this.cuisine).subscribe((data) => {
      this.recipe = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }
  searchFun(val: string) {
    this.searchText = val;
    this.service.getrecipe(this.searchText).subscribe((res: any) => {
      this.q = '';
      this.result = res.label;
      this.dataSource.data = res;
      this.obs1 = this.dataSource.connect();
    });
  }
}
