import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Item} from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = "https://api.codebyte-software.com:2323/api/items"
  // itemObservable canal de YouTube la care ne vom abona, el contine lista de obiecte
  private itemObservable = new BehaviorSubject<Array<Item>>([]);

  constructor(private httpClient: HttpClient) {
  }

  public create(item: Item) {
    const body = {
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      price: item.price
    };

    return this.httpClient.post(this.apiUrl, body);
  }

  public update(item: Item) {
    const body = {
      id: item.id,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      price: item.price
    };
    return this.httpClient.put(this.apiUrl, body);
  }

  public delete(id: string) {
    return this.httpClient.delete(this.apiUrl + "/" + id);
  }

  public read() {
    this.httpClient.get(this.apiUrl).subscribe((response: any) => {
      console.log(response);
      // response.data reprezinta lista de elemente din baza de date
      // .next() este metoda care actualizeaza "canalul de YouTube" de mai sus
      this.itemObservable.next(response.data);
    })
  }

  public getItemsList() {
    // asObservable() ne permite sa ne abonam la obiectul itemObservable
    return this.itemObservable.asObservable();
  }

}
