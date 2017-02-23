import {
    combineReducers
} from 'redux'
import nav from './nav'
import list from './list'
import filter from './filter'
import sort from './sort'
import formList from './formList'
import form from './form'
import confirm from './confirm'

export default combineReducers({
    nav,
    filter,
    sort,
    list,
    formList,
    form,
    confirm
})
