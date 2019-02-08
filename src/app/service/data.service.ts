import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Item} from '../types/item';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import { APIService, GetItemQuery, AllItemsQuery ,AllItemsByTitleQuery} from '../API.service';
import { delay } from 'rxjs/operators';

@Injectable()
export class DataService {

  dataChange: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  
  public apsync : APIService = new APIService();

  constructor (private httpClient: HttpClient) {}

  get data(): Item[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {

    const itemQuery = this.apsync.AllItems(10);
    itemQuery.then((res: AllItemsQuery) => {
      this.dataChange.next(res.items);
    });
  }

  addIssue (item: Item): void {

    this.apsync.AddItem(item.name,item.id,item.content,item.title,item.url);

    this.dialogData = item;
  
  }

  updateIssue (item: Item): void {

    this.apsync.UpdateItem(item.name,item.id,item.content,item.title,item.url);
    this.dialogData = item;
  }

  deleteIssue (id: string): void {
    this.apsync.DeleteItem(id);
    console.log(id);
  }
}


