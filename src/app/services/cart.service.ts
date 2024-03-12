import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Item} from "../models/item.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartObservable = new BehaviorSubject<Array<any>>([]);

  public addToCart(item: Item): void {
    let items = this.cartObservable.getValue();
    items.push(item);
    this.cartObservable.next(items);
  }

  public removeFromCart(item: Item): void {
    let items = this.cartObservable.getValue();

    items = items.filter((it: any) => it.id != item.id);
    this.cartObservable.next(items);
  }

  public getCart() {
    return this.cartObservable.asObservable()
  }
}
