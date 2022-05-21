
import {  useContext } from "react"
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

// UserResults - акумулює вхідні дані та працює над даними контексту, як збірник-конструктор
function UserResults() {
	// за допомогою деструктуризації дістаємо необхідні нам дані : users, loading, fetchUsers з контексту GithubContext і подальша робота з нимим в даному компоненті
	const {users, loading} = useContext(GithubContext)
	// UserResults - викликає fetchUsers за допомогою хука useEffect з контексту GithubContext
	//useEffect (() =>{
	//	fetchUsers()
	//}, [])
	// виконуються нвступні умови- якщо норм- тоді будується DOM, якщо ні- запускається Spinner
	if(!loading){
		return (
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{users.map((user) => (
					<UserItem key={user.id} user={user} />
				))}
			</div>
		)
	}else{
		return <Spinner/>		
	}
}
export default UserResults