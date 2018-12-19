import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Item } from '../item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  columns: string[] = ['item_name', 'item_price'];
  data: Item[] = [];
  isLoadingResults = true;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getItems()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
