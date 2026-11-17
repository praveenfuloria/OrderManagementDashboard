import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Orders } from './orders/orders';

@Component({
  imports: [RouterOutlet, Orders],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('OrderManagementDashboard');
}
