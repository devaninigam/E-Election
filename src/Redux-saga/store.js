import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core'
import RootReducer from './rootreduser';
import { SagaIndex } from '../Redux-saga/Admin_Code/Saga/index';
import { voteSaga } from './User_code/saga';

const SagaMiddleware = createSagaMiddleware()

const store = createStore(
  RootReducer,
  (applyMiddleware(SagaMiddleware))
)
SagaMiddleware.run(SagaIndex);
SagaMiddleware.run(voteSaga)

export default store;