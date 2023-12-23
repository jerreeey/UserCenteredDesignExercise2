import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService) {}
  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;
  public selectedKindergarten: string = ''; 
  public selectedSort: string = 'name';
  public childrenPerPage: number = CHILDREN_PER_PAGE;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage, this.selectedKindergarten, this.selectedSort);
  }
  
  filterTable() {
    this.backendService.getChildren(this.currentPage, this.selectedKindergarten, this.selectedSort);
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  selectPage(i: any) {
    let currentPage = i;
    this.selectPageEvent.emit(currentPage)
    this.backendService.getChildren(currentPage, this.selectedKindergarten, this.selectedSort);
  }

  public returnAllPages() {
    return Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE)
  }

  public cancelRegistration(childId: string) {

    if(this.returnAllPages() == this.currentPage && this.storeService.childrenTotalCount % CHILDREN_PER_PAGE == 1) {
      this.backendService.deleteChildData(childId, this.currentPage, true);
      this.paginator?.previousPage();
    } else {
      this.backendService.deleteChildData(childId, this.currentPage, false);
    }
  }
}


