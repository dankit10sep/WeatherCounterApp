import { createReducer, on } from '@ngrx/store';
import { setCount, increment, decrement, reset, deleteCounter } from './counter.actions';

export interface CounterState {
    counters: number[];
}

export const initialState: CounterState = {
    counters: []
};

const _counterReducer = createReducer(
    initialState,
    on(setCount, (state, { count }) => {
        const newCounters = [...state.counters, 0];
        return {
            ...state,
            counters: newCounters
        };
    }),

    on(increment, (state, { index }) => {
        const updatedCounters = [...state.counters];
        updatedCounters[index]++;
        return {
            ...state,
            counters: updatedCounters
        };
    }),
    on(decrement, (state, { index }) => {
        const updatedCounters = [...state.counters];
        if (updatedCounters[index] > 0) {
            updatedCounters[index]--;
        }
        return {
            ...state,
            counters: updatedCounters
        };
    }),
    on(deleteCounter, (state, { index }) => ({
        ...state,
        counters: state.counters.filter((_, i) => i !== index)
    })),
    on(reset, () => initialState)
);

export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action);
}
