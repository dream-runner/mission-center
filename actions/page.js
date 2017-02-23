import { CHANGE_ACTIVEPAGE, CHANGE_PREPAGE, CHANGE_NEXTPAGE,GETLIST_REQUEST, GETLIST_SUCCESS,
    GETLIST_FAILURE,GET_ITEMS_SUCCESS, GET_ITEMS_FAILURE,IS_SEARCH} from '../constants/ActionTypes'




export function getItems() {  
    return (dispatch, getState) => {
         dispatch({
            type: GETLIST_REQUEST
        })
         return fetch(`${window.$ctx}/tc/getItems`, {
                credentials: 'include',
                cache: 'no-cache'
            }).then( response => {
                 if (response.ok) {
                    response.text().then(text => {
                        if (text) {
                            try {
                                let json = JSON.parse(text)                                
                                if (json.status == 0) {
                                    dispatch(getListFailure(json.message))
                                } else {  
                                    if(json.items==0){
                                        dispatch(getListSuccess(json,1)) 
                                    }else{
                                        fetch(`${window.$ctx}/tc/getMine?activePage=1`, {
                                                        credentials: 'include',
                                                        cache: 'no-cache'
                                                    }).then( response => {
                                                         if (response.ok) {
                                                                response.text().then(data => {
                                                                    if (data) {
                                                                        try {
                                                                            let datajson = JSON.parse(data)                                
                                                                            if (datajson.status == 0) {
                                                                                dispatch(getListFailure(datajson.message))
                                                                            } else {    
                                                                                dispatch(getItemsSuccess(json))    
                                                                                dispatch(getListSuccess(datajson, 1))
                                                                                dispatch(getActivePage(1))
                                                                            }
                                                                        } catch (e) { 
                                                                            dispatch(getListFailure(`${e.message}`))
                                                                        }
                                                                    } else {
                                                                        dispatch(getListFailure('搜索数据为空，请修改搜索条件'))
                                                                    }
                                                                })
                                                            } else {
                                                                dispatch(getListFailure(`${response.status} ${response.statusText}`))
                                                            }

                                            }) 

                                    }

                                }
                            } catch (e) { 
                                dispatch(getItemsFailure(`${e.message}`))
                            }
                        } else {
                            
                                dispatch(getItemsFailure('搜索数据为空，请修改搜索条件'))
                        }
                    })
                } else {
                    dispatch(getItemsFailure(`${response.status} ${response.statusText}`))
                   }

            } )
    }
}



export function search(searchText){
        return (dispatch, getState) => {
         let encodedSearchText = encodeURI(encodeURI(searchText))	
          dispatch({
            type: GETLIST_REQUEST
        })
         return fetch(`${window.$ctx}/tc/getSearchItems?searchItems=${encodedSearchText}`, {
                credentials: 'include',
                cache: 'no-cache'
            }).then( response => {
                 if (response.ok) {
                    response.text().then(text => {
                        if (text) {
                            try {
                                let json = JSON.parse(text)                                
                                if (json.status == 0) {
                                    dispatch(getItemsFailure(json.message))
                                } else {  
                                    if(json.items==0){
                                        dispatch(getListSuccess(json,1)) 
                                    }else{
                                    		fetch(`${window.$ctx}/tc/getSearchPagedItem?activePage=1`, {
                                                    credentials: 'include',
                                                    cache: 'no-cache'
                                    			}).then( response => {
                                                     if (response.ok) {
                                                            response.text().then(data => {
                                                                if (data) {
                                                                    try {
                                                                        let datajson = JSON.parse(data)                                
                                                                        if (datajson.status == 0) {
                                                                            dispatch(getListFailure(datajson.message))
                                                                        } else {               
                                                                            dispatch(getItemsSuccess(json))    
                                                                            dispatch(getListSuccess(datajson, 1))
                                                                            dispatch(getActivePage(1))
                                                                            dispatch(issearch())
                                                                        }
                                                                    } catch (e) { 
                                                                        dispatch(getListFailure(`${e.message}`))
                                                                    }
                                                                } else {
                                                                    dispatch(getListFailure('搜索数据为空，请修改搜索条件'))
                                                                }
                                                            })
                                                        } else {
                                                            dispatch(getListFailure(`${response.status} ${response.statusText}`))
                                                        }

                                                }) 
                                    }

                                }
                            } catch (e) { 
                                dispatch(getItemsFailure(`${e.message}`))
                            }
                        } else {
                            
                                dispatch(getItemsFailure('搜索数据为空，请修改搜索条件'))
                        }
                    })
                } else {
                    dispatch(getItemsFailure(`${response.status} ${response.statusText}`))
                   }

            } )
    }
}






function getItemsSuccess(json) {
    let { items = 10 } = json
    return (dispatch) => {
        dispatch({
            type: GET_ITEMS_SUCCESS,
            items
        })
    }
}


function getItemsFailure(message) {
    return {
        type: GET_ITEMS_FAILURE,
        message
    }
}


function issearch(json) {
    return (dispatch) => {
        dispatch({
            type: IS_SEARCH,
        })
    }
}




export function change(activePage,issearch) {
    if(issearch=='y')
        return getSearchList(activePage) 
    else
        return getList(activePage) 
}

export function getList(activePage) {
    return (dispatch, getState) => {
        dispatch({
            type: GETLIST_REQUEST
        })
        return fetch(`${window.$ctx}/tc/getMine?activePage=${activePage}`, {
                credentials: 'include',
                cache: 'no-cache'
            }).then( response => {
                if (response.ok) {
                    response.text().then(text => {
                        if (text) {
                            try {
                                let json = JSON.parse(text)                                
                                if (json.status == 0) {
                                    dispatch(getListFailure(json.message))
                                } else {                 
                                    dispatch(getListSuccess(json, activePage))
                                    dispatch(getActivePage(activePage))
                                }
                            } catch (e) { 
                                dispatch(getListFailure(`${e.message}`))
                            }
                        } else {
                            dispatch(getListFailure('搜索数据为空，请修改搜索条件'))
                        }
                    })
                } else {
                    dispatch(getListFailure(`${response.status} ${response.statusText}`))
                }
            }
        )
    }
}

export function getSearchList(activePage) {
    return (dispatch, getState) => {
        dispatch({
            type: GETLIST_REQUEST
        })
        return fetch(`${window.$ctx}/tc/getSearchPagedItem?activePage=${activePage}`, {
                credentials: 'include',
                cache: 'no-cache'
            }).then( response => {
                if (response.ok) {
                    response.text().then(text => {
                        if (text) {
                            try {
                                let json = JSON.parse(text)                                
                                if (json.status == 0) {
                                    dispatch(getListFailure(json.message))
                                } else {                 
                                    dispatch(getListSuccess(json, activePage))
                                    dispatch(getActivePage(activePage))
                                    dispatch(issearch())
                                }
                            } catch (e) { 
                                dispatch(getListFailure(`${e.message}`))
                            }
                        } else {
                            dispatch(getListFailure('搜索数据为空，请修改搜索条件'))
                        }
                    })
                } else {
                    dispatch(getListFailure(`${response.status} ${response.statusText}`))
                }
            }
        )
    }
}




function getListSuccess(json, navKey) {
    let { data = [], total = 0 } = json
    return (dispatch) => {
        dispatch({
            type: GETLIST_SUCCESS,
            data,
            total,
            navKey
        })
    }
}


function getActivePage(activePage) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_ACTIVEPAGE,
            activePage
        })
    }
}

function getListFailure(message) {
    return {
        type: GETLIST_FAILURE,
        message
    }
}




export function prepage() {
     return (dispatch, getState) => {
        let state = getState()
        dispatch({state})
    }
	

}

export function nextpage() {
    return (dispatch, getState) => {
        let state = getState()
        dispatch({state})
    }
}