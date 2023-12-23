import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';
import { CHILDREN_PER_PAGE } from './constants';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getKindergardens() {
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.storeService.kindergardens = data;
    });
  }

  public getKindergarden(id: string) {
    this.http.get<Kindergarden>(`http://localhost:5000/kindergardens/${id}`).subscribe(data => {
      this.storeService.selectedKindergarden = data;
    });
  }

  public getChildren(page: number, kindergartenFilter: string = '', sort: string = 'name', order: string = 'asc') {
    this.storeService.isLoading = true;
    if(sort=="signUpDate DESC") {
      sort="signUpDate";
      order="desc";
    } 

    let url = `http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${CHILDREN_PER_PAGE}&_sort=${sort}&_order=${order}`;
    if (kindergartenFilter !== '') {
      url += `&kindergardenId=${encodeURIComponent(kindergartenFilter)}`;
    }
    
    this.http.get<ChildResponse[]>(url, { observe: 'response' }).subscribe(data => {
      this.storeService.children = data.body!;
      this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
      this.storeService.isLoading = false;
    });
  }

    public addChildData(child: Child, page:  number) {

      this.http.post('http://localhost:5000/childs', child).subscribe(_ => {
        this.getChildren(page);
      })
    }

    public deleteChildData(childId: string, page: number, lastPage: boolean = false) {
      this.storeService.isLoading = true;
      this.http.delete(`http://localhost:5000/childs/${childId}`).subscribe(_=> {
        if(!lastPage) {
          this.getChildren(page);
        }
      })
    }
  }
