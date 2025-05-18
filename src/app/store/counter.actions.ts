import { createAction, props } from '@ngrx/store';

export const setCount = createAction(
    '[Counter] Set Count',
    props<{ count: number }>()
);

export const increment = createAction(
    '[Counter] Increment',
    props<{ index: number }>()
);

export const decrement = createAction(
    '[Counter] Decrement',
    props<{ index: number }>()
);

export const reset = createAction('[Counter] Reset');

export const deleteCounter = createAction(
    '[Counter] Delete',
    props<{ index: number }>()
);
