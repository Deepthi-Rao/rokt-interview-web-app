import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PexelsService } from '../pexels.service';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchQuery = new FormControl('');

  constructor(public pexelService: PexelsService) { }

  ngOnInit(): void {
    if(this.pexelService.searchQuery) {
      this.searchQuery.setValue(this.pexelService.searchQuery);
    }
    this.searchQuery.valueChanges.pipe(debounceTime(800)).subscribe(query => {
      console.log('hello');
      this.pexelService.getPaginatedImages('', query);
    })
  }

}


