import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../models/item.model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ItemService} from "../services/item.service";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    NgForOf,
    MatButton,
    NgIf
  ],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {

  // @Output ne ajuta sa definim un eveniment prin care trimitem datele din ListItems in pagina de home/dashboard
  @Output() updateDataEvent: EventEmitter<Item> = new EventEmitter<Item>();
  itemsList: Array<any> = [];

  // ascunde butoanele de update si delete cand suntem pe pagina de home si afiseaza butonul de buy
  @Input({transform: booleanAttribute, alias: "showBuyButton"}) showBuyButton: boolean = true;

  constructor(private itemService: ItemService, private cartService: CartService) {
    itemService.getItemsList().subscribe((itemsListFromService: Array<Item>) => {
      this.itemsList = itemsListFromService;
    })
  }

  onDelete(item: Item): void {
    console.log(item);
    this.itemService.delete(item.id).subscribe((response: any) => {
      console.log(response);
      this.itemService.read();
    })
  }

  onUpdate(item: Item): void {
    console.log(item);
    // metoda emit() trimite itemul in pagina de home/dashboard, apeleaza evenimentul updateData
    this.updateDataEvent.emit(item);
  }

  onBuy(item: Item) {
    console.log(item);
    this.cartService.addToCart(item);
  }
}
