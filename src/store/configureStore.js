import { createStore, applyMiddleware } from 'redux';
import { pageReducer } from '../reducers/PageReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const store = createStore(pageReducer, applyMiddleware(thunk, logger));