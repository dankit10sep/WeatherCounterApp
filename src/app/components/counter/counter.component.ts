import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, setCount, reset, deleteCounter } from 'src/app/store/counter.actions';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {
  counters$: Observable<number[]>;
  counterCount$: Observable<number>;


  constructor(private store: Store<{ counter: { counters: number[] } }>) {
    this.counters$ = this.store.select(state => state.counter.counters);
    this.counterCount$ = this.store.select(state => state.counter.counters.length);

  }

  addCounter() {
    this.store.select(state => state.counter.counters).pipe(take(1)).subscribe((counters) => {
      const updatedCounters = [...counters, 0];
      this.store.dispatch(setCount({ count: updatedCounters.length }));
    });
  }

  resetCounters() {
    this.store.dispatch(reset());
  }

  incrementCounter(index: number) {
    this.store.dispatch(increment({ index }));
  }

  decrementCounter(index: number) {
    this.store.dispatch(decrement({ index }));
  }

  deleteCounter(index: number) {
    this.store.dispatch(deleteCounter({ index }));
  }
}
