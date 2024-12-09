import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Order, OrderItem } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = `${environment.apiUrl}/orders`;
  private orderItemsUrl = `${environment.apiUrl}/order-items`;
  private cartState = new BehaviorSubject<Order>(null);

  constructor(private http: HttpClient) {}

  // Method to create a new order
  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order).pipe(
      map((newOrder: Order) => {
        this.cartState.next(newOrder);
        return newOrder;
      })
    );
  }

  // Method to retrieve an order by ID
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.ordersUrl}/${orderId}`).pipe(
      map((order: Order) => {
        this.cartState.next(order);
        return order;
      })
    );
  }

  // Method to update an existing order
  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.ordersUrl}/${order.order_id}`, order).pipe(
      map((updatedOrder: Order) => {
        this.cartState.next(updatedOrder);
        return updatedOrder;
      })
    );
  }

  // Method to delete an order by ID
  deleteOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.ordersUrl}/${orderId}`).pipe(
      map(() => {
        this.cartState.next(null);
      })
    );
  }

  // Method to add an item to an order
  addItemToOrder(orderId: string, orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.orderItemsUrl}/${orderId}`, orderItem).pipe(
      map((newOrderItem: OrderItem) => {
        const currentOrder = this.cartState.value;
        currentOrder.items.push(newOrderItem);
        this.cartState.next(currentOrder);
        return newOrderItem;
      })
    );
  }

  // Method to remove an item from an order
  removeItemFromOrder(orderId: string, orderItemId: string): Observable<void> {
    return this.http.delete<void>(`${this.orderItemsUrl}/${orderId}/${orderItemId}`).pipe(
      map(() => {
        const currentOrder = this.cartState.value;
        currentOrder.items = currentOrder.items.filter(item => item.order_item_id !== orderItemId);
        this.cartState.next(currentOrder);
      })
    );
  }

  // Method to update the quantity of an item in an order
  updateOrderItemQuantity(orderId: string, orderItemId: string, quantity: number): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.orderItemsUrl}/${orderId}/${orderItemId}`, { quantity }).pipe(
      map((updatedOrderItem: OrderItem) => {
        const currentOrder = this.cartState.value;
        const itemIndex = currentOrder.items.findIndex(item => item.order_item_id === orderItemId);
        if (itemIndex > -1) {
          currentOrder.items[itemIndex].quantity = quantity;
          this.cartState.next(currentOrder);
        }
        return updatedOrderItem;
      })
    );
  }

  // Method to get the current state of the cart
  getCartState(): Observable<Order> {
    return this.cartState.asObservable();
  }

  // Method to clear the cart state
  clearCartState(): void {
    this.cartState.next(null);
  }
}
