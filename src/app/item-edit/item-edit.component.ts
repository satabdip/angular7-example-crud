import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {
  itemForm: FormGroup;
  _id: number ;
 item_name: String = '';
 item_desc: String = '';
 item_price: number = null;
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getItem(this.route.snapshot.params['id']);
  this.itemForm = this.formBuilder.group({
    'item_name' : [null, Validators.required],
    'item_desc' : [null, Validators.required],
    'item_price' : [null, Validators.required]
  });
  }
  getItem(id) {
    this.apiService.getItem(id).subscribe(data => {
      this._id = data.id;
      this.itemForm.setValue({
        item_name: data.item_name,
        item_desc: data.item_desc,
        item_price: data.item_price
      });
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.apiService.updateItem(this._id, form)
      .subscribe(res => {
          const id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/item-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
  itemDetails() {
    this.router.navigate(['/item-details', this._id]);
  }
}
