import { Component, OnInit } from '@angular/core';
import { PexelsService } from '../pexels.service';


@Component({
  selector: 'app-image-container',
  templateUrl: './image-container.component.html',
  styleUrls: ['./image-container.component.scss']
})
export class ImageContainerComponent implements OnInit {

  

  constructor(public pexelService:PexelsService) { }

  ngOnInit(): void {
  }


}
