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
import page from './page'
import search from './search'
import formFilters from './formFilters'
import dropdown from './dropdown'
import dateperiodPicker from './dateperiodPicker'

export default combineReducers({
    nav,
    filter,
		formFilters,
    sort,
    list,
    formList,
    form,
    confirm,
    page,
    search,
		dropdown,
		dateperiodPicker
})
