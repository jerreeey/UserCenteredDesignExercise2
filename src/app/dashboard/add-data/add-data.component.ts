import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit{

  minDate: Date;
  maxDate: Date;
  myModal: any;

  @ViewChild('formDirective') private formDirective: NgForm | undefined;

  constructor(private formbuilder: FormBuilder, public storeService: StoreService, public backendService: BackendService) {
        const currentYear = new Date().getFullYear();
        const currentDate = new Date();
        this.minDate = new Date(currentYear - 7, 0, 1);
        this.maxDate = new Date(currentDate);
  }
  public addChildForm: any;
  @Input() currentPage!: number;

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      signUpDate: [this.getCurrentDate()],
      birthDate: [null, Validators.required],
    })
    this.myModal = document.getElementById('exampleModal')
    this.myModal.addEventListener('show.bs.modal',  (event?: any) => {
      if (this.addChildForm.invalid) {
        return event.preventDefault()
      }
    })
  }

  onSubmit() {
    if(this.addChildForm.valid) {
      this.backendService.addChildData(this.addChildForm.value, this.currentPage);
      this.formDirective?.resetForm();
    }
  }


  getErrorMessage(input: string) {
    if (this.addChildForm.controls[input].hasError('matDatepickerMin')) {
      return 'Datum muss nach 01/01/2016 liegen!';
    } else if (this.addChildForm.controls[input].hasError('matDatepickerMax')){
      return 'Datum darf nicht in der Zukunft liegen!';
    } else if (this.addChildForm.controls[input].hasError('required') || this.addChildForm.controls[input].hasError('required') || this.addChildForm.controls[input].hasError('required')) {
      return 'Formularfeld muss ausgefüllt sein!';
    } else {
        return '';
    }
  }

  private getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
