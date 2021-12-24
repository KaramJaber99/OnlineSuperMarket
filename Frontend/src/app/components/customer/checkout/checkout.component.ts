import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Cart } from 'src/app/models/Cart';
import { City } from 'src/app/models/City';
import { Order } from 'src/app/models/Order';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cities: string[];
  // public creditCard: string;
  public invoiceUrl: SafeUrl;
  public orderDetails: Order;
  public minDate: NgbDate;
  public maxDate: NgbDate;
  // public model: NgbDate;
  public unavailableDeliveryDates: NgbDate[];
  public displayModal: string;

  public checkoutForm: FormGroup;
  public city: FormControl;
  public street: FormControl;
  public deliveryDate: FormControl;
  public creditCard: FormControl;

  constructor(private router: Router, private sanitizer: DomSanitizer,
    private calendar: NgbCalendar, private usersService: UsersService, 
    private cartService: CartService, private ordersService: OrdersService) 
  {
      // this.creditCard = "";
      this.displayModal="none";
      this.invoiceUrl = null;
      this.orderDetails = new Order();
      this.cities = Object.values(City);
      this.unavailableDeliveryDates = [];
      this.minDate = this.calendar.getToday();
      this.maxDate = this.calendar.getNext(this.minDate, 'm', 2);
  }

  ngOnInit(): void { 
    // Get unavailable delivery dates
    let observable = this.ordersService.getUnavailableDeliveryDates();
    observable.subscribe(dates => {
      
        dates.forEach(a => {
          let date = new Date(a.deliveryDate);
          // console.log(date, date.getDate());
          this.unavailableDeliveryDates.push(
            new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
        });

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });

    // Initializing form controls with validators
    this.city = new FormControl("", Validators.required);
    this.street = new FormControl("", Validators.required);
    this.deliveryDate = new FormControl("", [Validators.required, 
        this.unavailableDeliveryDatesValidator(), this.weekendsValidator()]);
    this.creditCard = new FormControl("", [Validators.required, 
      Validators.pattern("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$")]);

    // Initializing the from group
    this.checkoutForm = new FormGroup({
      city: this.city,
      street: this.street,
      deliveryDate: this.deliveryDate,
      creditCard: this.creditCard
    });
  }

  public unavailableDeliveryDatesValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const unavailable = this.unavailableDeliveryDates.find(date => 
        date.equals(control.value));
      return unavailable ? { unavailableDate: true} : null;
    };
  }

  public weekendsValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const weekend = this.calendar.getWeekday(control.value) == 6;
      return weekend ? { weekend: true} : null;
    };
  }

  public onDblStreet(): void {
    let observable = this.usersService.getStreet();

    observable.subscribe(data => {
      this.street.setValue(data);

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " +
        serverErrorResponse.error.error);
    });
  }

  public onDblCity(): void {
    let observable = this.usersService.getCity();

    observable.subscribe(data => {
      this.city.setValue(data);

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " +
        serverErrorResponse.error.error);
    });
  }

  public onPurchase(): void {
    //format delivery date
    let date = new Date(this.deliveryDate.value.year, this.deliveryDate.value.month - 1, 
      this.deliveryDate.value.day);
    let dateWithoutOffset = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

    this.orderDetails = new Order(null, 
      this.cartService.cart.id,
      this.cartService.total, 
      this.city.value, this.street.value, 
      new Date(),
      dateWithoutOffset,
      this.creditCard.value.substr(-4)
    );

    let observable = this.ordersService.saveOrder(this.orderDetails);
    observable.subscribe( orderId => {

      // Create invoice
      this.orderDetails.id = orderId;
      this.createInvoice();
      this.displayModal = "block";

      // Init cart details
      this.initizlizeCart();

    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  public createInvoice(): void {
    let content = "🛒 Thank you for shopping at our Supermarket 🛒\n\n" +
      "Order No. #" + this.orderDetails.id + "\n" +
      this.orderDetails.orderDate.toISOString().split('T')[0] + "\n\n" +
      "Items Ordered\n" +
      "-------------------------------------------------------------------\n";

    this.cartService.cart.products.forEach(item => {
      content += " " + item.name.padEnd(30) + "\tx " + item.quantity +
        "\t₪" + item.price + "\n";
    });

    content += "-------------------------------------------------------------------\n" +
      "Total: ₪" + this.cartService.total + "\n\n\nShipping Address🚚\n" +
      "-------------------------------------------------------------------\n " +
      this.orderDetails.street + ", " + this.orderDetails.city + "\n " +
      "Delivery on: " + this.orderDetails.deliveryDate.toISOString().split('T')[0] + "\n\n" +
      "Payment Info \n" +
      "-------------------------------------------------------------------\n " +
      "💳 **** **** **** " + this.orderDetails.paymentMethod;

    let blob = new Blob([content], { type: 'text/plain' });
    this.invoiceUrl =
      this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
  }

  public onCloseModal(): void {
    this.cartService.isInShoppingMode = false;
    this.displayModal="none";
    this.router.navigate(["/home/shop"]);
  }

  public isDisabled = (date: NgbDate) => {
    if (this.calendar.getWeekday(date) == 6 ) {
      return true;
    } 
     return this.unavailableDeliveryDates.find(x => x.equals(date));
  }

  public initizlizeCart() {
    this.cartService.cart = new Cart();
    this.cartService.cart.products = new Map();
    this.cartService.total = 0;
    this.cartService.isCartOpen = true;
    sessionStorage.removeItem("cartId");
  }
  
}
