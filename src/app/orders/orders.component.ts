import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  modalRef: any;
  order: Order = new Order();
  isUpdating: boolean;
  @ViewChild('orderForm') orderForm: TemplateRef<any>;

  sampleData: Array<Order> = [
    { 'id': '44568', 'contract': 'ESH8', 'account': 'DU66', 'positions': 5 },
    { 'id': '44569', 'contract': 'ESM9', 'account': 'DU67', 'positions': 7 },
    { 'id': '44570', 'contract': 'ESZ8', 'account': 'DU99', 'positions': 4 },
    { 'id': '44571', 'contract': 'SPX', 'account': 'DU54', 'positions': 9 },
    { 'id': '44572', 'contract': 'ESX', 'account': 'DU54', 'positions': 3 },
    { 'id': '44573', 'contract': 'FPU', 'account': 'DU65', 'positions': 1 },
    { 'id': '44574', 'contract': 'MUY', 'account': 'DU68', 'positions': 4 }
  ]

  constructor(private modalService: NgbModal) { }

  ngOnInit() { }

  // open model form
  addOrder() {
    this.modalRef = this.modalService.open(this.orderForm);
  }

  /** 
     * instead of making a rest call with httpClient i have just added 
     * the object to the existing array 
    */
  placeOrder() {
    // checking for the empty obect
    if (Object.keys(this.order).length > 0) {
      // checking for update or add
      if (!this.isUpdating)
        this.sampleData.push(this.order);
    }
    // reset the values 
    this.modalRef.close();
    this.modalRef = undefined;
    this.isUpdating = false;
  }

  // cancel thhe order with help of index of the Data
  delete(index: any) {
    if (confirm("Are you sure to delete ")) {
      this.sampleData.splice(index, 1);
    }
  }

  // updating the existed order object with updated object through form values
  edit(orderData: Order, index: any) {
    this.isUpdating = true;
    if (!this.modalRef)
      this.modalRef = this.modalService.open(this.orderForm);
    this.order = orderData;
  }
}

class Order {
  id: string;
  contract: string;
  account: string;
  positions: number;
}