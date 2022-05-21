// мета Reducer локально обробити стан, без відправки його нагору , до батьківського компоненту
// на вхід reducer отримує початковий state та необхідний наступний action
const githubReducer = (state, action) => {
  // необхідно визначити тип action, для цього використ. не умову (це призведе до великого коду, а switch, який буде фільтрувати необхідний нам тип) 
  // наразі- ми створили дефолтний тип стан- action

  switch(action.type){
    // case 'GET_USERS'- тип - сигнал до необхідної дії, тип дії- отримати users
    case 'GET_USERS': // action-type
      return{

  // об'єкт, який складається з наступних полів:
  // 01- повертає необмежений масив поточного state через spread оператор
  // 02- users з властивостями - action.payload (payload- результат отриманих даних , які привласн. action)
  // 03- loading: false- при завант. даних, spinner не працює
        ...state,
        users: action.payload,  
        loading: false,
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      }

    case 'CLEAR_USERS':
      return{
        ...state,
        users: []
      }

// якщо жоден action.type не співпадає , то повертається дефолтний state
    default: 
      return state
  }
}
export default githubReducer