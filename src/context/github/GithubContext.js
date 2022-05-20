import { createContext, useReducer } from "react";
// GithubContext - викликається метод createContext() для роботи Контексту- даний компонент
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

	const initialState = {
		users: [],
		loading: true
	}

	// застосовуємо Reducer: дефолтне значення state githubReducer та новий action - initialState
	// dispatch - 
	const [state, dispatch] = useReducer(githubReducer, initialState)

	const fetchUsers = async () =>{
		const response = await fetch(`${GITHUB_URL}/users`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			}
		})

		const data = await response.json()

		dispatch({
			type: 'GET_USERS',
			payload: data,
		})
	}
// повертаються необхідні нам дані отриманого результату запиту users,		loading та відповідно результат - fetchUsers
	return <GithubContext.Provider value={{
		users: state.users,
		loading: state.loading,
		fetchUsers,
	}}>
		{/* children- передбачають додавання та розширення DOM за рахунок необмеженої кількості даних */}
		{children}
	</GithubContext.Provider>
}

export default GithubContext