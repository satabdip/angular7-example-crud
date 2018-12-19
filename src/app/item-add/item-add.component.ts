import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
 selector: 'app-item-add',
 templateUrl: './item-add.component.html',
 styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements OnInit {
itemForm: FormGroup;
item_name: String = '';
item_desc: String = '';
item_price: number = null;
updated_at: Date = null;
isLoadingResults = false;
constructor(private router: Router, private apiService: ApiService, private formBuilder: FormBuilder) { }
 ngOnInit() {
 this.itemForm = this.formBuilder.group({
'item_name' : [null, Validators.required],
'item_desc' : [null, Validators.required],
'item_price' : [null, Validators.required],
// 'updated_at' : [null, Validators.required]
});
}
 onFormSubmit(form: NgForm) {
  this.isLoadingResults = true;
  this.apiService.addItem(form)
  .subscribe(res => {
  const id = res['_id'];
  this.isLoadingResults = false;
  this.router.navigate(['/item-details', id]);
  }, (err) => {
  console.log(err);
  this.isLoadingResults = false;
  });
 }
}
