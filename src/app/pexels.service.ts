import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from './paginator/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {

  images$!: Observable<Pagination>;

  environment = "http://localhost:3000/all";

  page: number = 0;

  searchQuery: string = "";

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.handleInitialRouteLoad();
  }
  handleInitialRouteLoad() {
    try{
      var url = new URL(window.location.href);
      let search = url.searchParams.get("search");
      let page = Number(url.searchParams.get("page"));
      console.log(page, search);
      if(search && page) {
        this.handleSearchRequest(page, search);
      } 
      else if(page) {
        let url = "https://api.pexels.com/v1/curated?page=" + page + "&per_page=10";
        this.handlePagination(url);
      }
      else {
        this.getPaginatedImages();
      }
    } catch(e) {
      this.getPaginatedImages();
    }
  }
  handlePagination(paginationUrl: string) {
    this.images$ = this.http.get<Pagination>(this.environment , 
      {params: {url: paginationUrl + ""}}
      );
    let indexOfPageChar = paginationUrl.indexOf("page=")
    let indexOfNextAmp = paginationUrl.indexOf("&", indexOfPageChar);
    indexOfPageChar +=5;
    this.page = Number(paginationUrl.substring(indexOfPageChar, indexOfNextAmp));
  }
  handleSearchRequest(page: number, searchString?: string) {
      this.page = page;
      let url = "https://api.pexels.com/v1/";
      if(searchString) {
        this.searchQuery = searchString;
        url += "search?page=" + page + "&per_page=10&"
        url += "query=" + searchString;
      }
      else {
        url += "curated?page=1&per_page=10";
      }
      this.images$ = this.http.get<Pagination>(this.environment , 
        {params: {url: url}}
      );
  }
  getPaginatedImages(paginationUrl?: string, searchString?: string) {
    if(paginationUrl) {
      this.handlePagination(paginationUrl);
    } else {
      this.handleSearchRequest(1, searchString);
    }
    this.handleRouter()
  }
  handleRouter() {
    this.router.navigate(
      [], 
      {
        relativeTo: this.route,
        queryParams: { page: this.page, search: this.searchQuery }, 
        queryParamsHandling: 'merge',
      });
  }
}
