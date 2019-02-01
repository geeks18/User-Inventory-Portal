import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Item} from '../types/item';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import { APIService, GetItemQuery, AllItemsQuery ,AllItemsByTitleQuery} from '../API.service';
import { delay } from 'rxjs/operators';

@Injectable()
export class DataService {
  private readonly API_URL = 'https://api.github.com/repos/angular/angular/issues';

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

  // DEMO ONLY, you can find working methods below
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



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/




