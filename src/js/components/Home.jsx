import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";


//create your first component
const Home = () => {

	const [test, setTest] = useState(false);
	const [users, setUsers] = useState([])
	const [selected, setSelected] = useState('')
	const [userTodos, setUserTodos] = useState([])
	const [newTask, setNewTask] = useState('')

	
	//sintaxis useEffect 
	/* 
	
	useEffect(()=>{},[]) se ejecuta cuando se carga el componente
	useEffect(()=>{},[estado(s)]) cada vez que se modifique el estado, se ejecuta
	
	*/

	useEffect(() => {
		console.log('pepe effect')
		// solo uno con el array de dependencias vacio
		readUsers()
		getTodos()
	}, [])

	useEffect(() => {
		console.log('pepe effect al modificarse test')
		//con dependencias, todos los que necesiten!
	}, [test])


	useEffect(() => {
		//al modificarse selected, disparamos funcion para traernos el todo list del usuario seleccionado	

		fetch('https://playground.4geeks.com/todo/users/' + selected)
			.then(resp => {
				if (!resp.ok) {
					throw new Error('something went wrong')
				}
				return resp.json() // transformamos el texto a JSON --> objetos javascript
			})
			.then(data => setUserTodos(data.todos))
			.catch(err => console.log(err))

	}, [selected])

	const readUsers = () => {
		fetch('https://playground.4geeks.com/todo/users')
			.then(resp => {
				console.log(resp)
				if (!resp.ok) {
					throw new Error('something went wrong')
				}
				return resp.json() // transformamos el texto a JSON --> objetos javascript
			})
			.then(data => setUsers(data.users))
			.catch(err => console.log(err))
	}


	const createUser = () => {
		fetch('https://playground.4geeks.com/todo/users/pepismo', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify() // aqui va la info como un objeto
		})
			.then(resp => {
				if (!resp.ok) {
					throw new Error('something went wrong')
				}
				return resp.json() // transformamos el texto a JSON --> objetos javascript
			})
			.then(data => setUserTodos([]))
			.catch(err => console.log(err))
	}


	const getTodos = () => {
		//no es dinamico, solo sirve para pepismo
		fetch('https://playground.4geeks.com/todo/users/pepismo')
			.then(resp => {
				if (!resp.ok) {
					throw new Error('something went wrong')
				}
				return resp.json() // transformamos el texto a JSON --> objetos javascript
			})
			.then(data => setUserTodos(data.todos))
			.catch(err => createUser())
	}


	const handleSubmit = e => {
		// solo sirve para pepismo, no es dinamico
		e.preventDefault();
		fetch('https://playground.4geeks.com/todo/todos/pepismo', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({label: newTask, is_done: false}) // aqui va la info como un objeto
		})
			.then(resp => {
				if (!resp.ok) {
					throw new Error('something went wrong')
				}
				return resp.json() // transformamos el texto a JSON --> objetos javascript
			})
			.then(data => getTodos())
			.catch(err => console.log(err))

	}


	return (
		<div className="text-center">

			<form onSubmit={handleSubmit}>
				<input type="text" onChange={e => setNewTask(e.target.value)} value={newTask} />
			</form>

			<button onClick={() => setTest(!test)}></button>
			<ul>

				{users?.map(el => <li key={el.id} onClick={() => setSelected(el.name)}>{el.name}</li>)}
			</ul>

			<ul>

				{userTodos?.map(el => <li key={el.id} >{el.label}</li>)}
			</ul>


		</div>
	);
};

export default Home;