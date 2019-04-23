import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @ViewChild('orderForm') orderForm: TemplateRef<any>;

  sampleData: Array<Order> = [
    { 'id': '44568', 'contract': 'ESH8', 'account': 'DU66', 'positions': 4 },
    { 'id': '44569', 'contract': 'ESM9', 'account': 'DU67', 'positions': 4 },
    { 'id': '44570', 'contract': 'ESZ8', 'account': 'DU99', 'positions': 4 },
    { 'id': '44571', 'contract': 'SPX', 'account': 'DU54', 'positions': 4 },
    { 'id': '44572', 'contract': 'ESX', 'account': 'DU54', 'positions': 4 },
    { 'id': '44573', 'contract': 'FPU', 'account': 'DU65', 'positions': 4 },
    { 'id': '44574', 'contract': 'MUY', 'account': 'DU68', 'positions': 4 }
  ]
  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  modalRef: any;
  order: Order = new Order();
  isUpdating: boolean;

  addOrder() {
    this.modalRef = this.modalService.open(this.orderForm);
  }

  onClick() {
    console.log("Form was submitted!");
    console.log(this.order);
    if (Object.keys(this.order).length > 0) {
      if (!this.isUpdating)
        this.sampleData.push(this.order);
    }
    this.modalRef.close();
    this.modalRef = undefined;
    this.isUpdating = false;
  }

  delete(index: any) {
    if (confirm("Are you sure to delete ")) {
      console.log(index);
      this.sampleData.splice(index, 1);
    }
  }
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