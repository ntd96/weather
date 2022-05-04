import {createStore, combineReducers} from 'redux'
import stateAction from '../action/stateAction';

const appReducer = combineReducers({
    taskReducer: stateAction
});

const store = createStore(
    appReducer,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store