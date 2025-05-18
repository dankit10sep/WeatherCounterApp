
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  counterCount: number = 0;

  updateCounterCount(count: number) {
    this.counterCount = count;
  }
}
