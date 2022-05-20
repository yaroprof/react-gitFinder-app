
const githubReducer = (state, action) => {
  // необхідно визначити тип action, для цього використ. не умову (це призведе до великого коду, а switch, який буде фільтрувати необхідний нам тип) 
  // наразі- ми створили дефолтний тип стан- action

  switch(action.type){
    case 'GET_USERS':
      return{
        // повертає поточний state
        ...state,
        users: action.payload,
        loading: false,
      }

    default: 
      return state
  }
}
export default githubReducer