//@ts-nocheck
import { Reducer } from 'react';

interface Action {
   type: string;
}

const combineReducers = <S, A extends Action>(reducers: {
   [K in keyof S]: Reducer<S[K], A>;
}) => {
   return (state: S = {} as S, action: A) => {
      return Object.keys(reducers).reduce((nextState, key) => {
         const reducer = reducers[key] as Reducer<S[keyof S], A>;
         nextState[key] = reducer(state[key], action);
         return nextState;
      }, {} as S);
   };
};
