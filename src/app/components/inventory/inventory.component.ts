import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

import { APIService, GetItemQuery, AllItemsQuery } from '../../API.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  message = "Loading...."
  constructor(private auth: AuthService,private apsync: APIService) { }

  tableColumns: string[] = ['id', 'name', 'content', 'title', 'url'];
  dataSource = [];


  ngOnInit() {
    if (this.auth.isLoggedIn === true) {
      this.message = 'Welcome to inventory';
      const itemQuery = this.apsync.AllItems(10);
      itemQuery.then((res: AllItemsQuery) => {
        this.dataSource = res.items;
      });
    } else {
      this.message = 'Sorry you are not logged In';
    }
  }

}

