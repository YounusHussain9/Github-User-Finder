import {createStore} from'redux'
import roots from './Reducers'
import {devToolsEnhancer} from 'redux-devtools-extension'


const store = createStore(roots,devToolsEnhancer());

export default store;