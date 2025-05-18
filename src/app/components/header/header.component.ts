import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  counterCount$: Observable<number>;

  constructor(private store: Store<{ counter: { counters: number[] } }>, public router: Router) {
    this.counterCount$ = this.store.select(state => state.counter.counters.length);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
