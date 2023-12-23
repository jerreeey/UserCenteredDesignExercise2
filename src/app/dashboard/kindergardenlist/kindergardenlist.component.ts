import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-kindergardenlist',
  templateUrl: './kindergardenlist.component.html',
  styleUrls: ['./kindergardenlist.component.scss']
})
export class KindergardenlistComponent implements OnInit {

    constructor(public storeService: StoreService) {}

  ngOnInit(): void {
  }

}