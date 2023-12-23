import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/shared/store.service';
import { BackendService } from '../shared/backend.service';

@Component({
  selector: 'app-kindergarden',
  templateUrl: './kindergarden.component.html',
  styleUrls: ['./kindergarden.component.scss']
})
export class KindergardenComponent implements OnInit {

    constructor(private route: ActivatedRoute, private backendService: BackendService, public storeService: StoreService) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if(id) {
            this.backendService.getKindergarden(id)
        }
    }
}