import { createContext, useReducer } from "react";
// GithubContext - викликається метод createContext() для роботи Контексту- даний компонент
// наразі не треба useState, тому, що стан береться з Reducer
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// GithubProvider - огортає контекст та допомагає доставити локальні вхідні дані у глобальне середовище
export const GithubProvider = ({children}) =>{
	
	// в контексті відбувають локальні дії по збору і обробки вхідної інформаці
	// за допомогою useState додаємо вхідні дані до поточних станів, також - при необхідності - запуск LOading
	//const[users, setUsers] = useState([])
	//const[loading, setLoading] = useState(true)

	// початкоий стан - ініціалізація стану
	const initialState = {
		users: [],
		loading: false,
	}

	// застосовуємо Reducer: дефолтне значення state githubReducer та новий action - initialState
	// state - поточний стан , який бере потім на себе результат обчислення від reducer;
	//  dispatch - метод відправки
	// githubReducer - отримувач для подальш.обробки- reducer, який бере за основу-шаблон нульовий initialState
	// початкоий стан - ініціалізація стану
	const [state, dispatch] = useReducer(githubReducer, initialState)

// Get initial users (testing purposes))
	const fetchUsers = async () =>{
		setLoading()
		const response = await fetch(`${GITHUB_URL}/users`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			}
		})

		const data = await response.json()

	// dispatch - вказує reducer з якими кейсами треба працювати- змінює state/ аналогічно - setState- яка змінює даний стан
		dispatch({
			type: 'GET_USERS', // вказує, що будуть відбуватися певні дії
			payload: data,  // новуий стан
		})
	}

	// Set Loading
	const setLoading = () =>{dispatch({
		type: 'SET_LOADING',
		}
		)
	}

// повертаються необхідні нам дані отриманого результату запиту users,		loading та відповідно результат - fetchUsers
	return <GithubContext.Provider value={{
		// GithubProvider повертає оновлений state по кожному необхідному полю об'єкта і запускає ф-ю запита fetchUsers
		users: state.users,
		loading: state.loading,
		fetchUsers,
	}}>
		{/* children- передбачають додавання та розширення DOM за рахунок необмеженої кількості даних */}
		{children}
	</GithubContext.Provider>
}

export default GithubContext