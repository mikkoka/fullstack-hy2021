const reducer = (state = '', action) => {

  switch(action.type) {
    case 'SET_FILTER':
      return action.filter
    default: return state
  }

}

export const setFilter = (fs) => {
  return  {
    type: 'SET_FILTER',
    filter: fs
  }
  
}

export default reducer