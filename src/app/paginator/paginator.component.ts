import { Component, OnInit } from '@angular/core';
import { PexelsService } from '../pexels.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  constructor(public pexelService: PexelsService) { }

  ngOnInit(): void {
  }
  paginate(paginationString: string) {
    this.pexelService.getPaginatedImages(paginationString);
  }
}
