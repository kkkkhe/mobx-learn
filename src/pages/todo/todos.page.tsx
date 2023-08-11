import { observer } from "mobx-react-lite"
import { $$page } from "./todos.model"
import { NavLink, useSearchParams } from "react-router-dom"
import { FormEvent, Fragment } from "react";

const Product = observer(() => {
	const { updateTodo, createTodo, todo } = $$page
	const [params] = useSearchParams();
		const onSubmit = (e: FormEvent) => {
			e.preventDefault()
			createTodo.createTodo()
		}
		const onUpdateTodo = (e: FormEvent, id: number) => {
			e.preventDefault()
			updateTodo.updateTodo(id)
		}
    return (
			<div>
				<form action="">
					<input type="checkbox" checked={createTodo.completed} onChange={createTodo.toggleCheckbox}/>
					<input type="text" value={createTodo.title} onChange={(e) => createTodo.changeTitle(e.target.value)}/>
					<button onClick={onSubmit}>
						Create todo
					</button>
				</form>
				{todo.todos.map(({ id, title, completed, userId }) => {
					return (
						<Fragment key={id}>
							{updateTodo.id == id ? 
				<form action="">
					<input type="checkbox" checked={updateTodo.completed} onChange={updateTodo.toggleCheckbox}/>
					<input type="text" value={updateTodo.title} onChange={(e) => updateTodo.changeTitle(e.target.value)}/>
					<button onClick={(e) => onUpdateTodo(e, id)}>
						Update todo	
					</button>
				</form>
						: 
						<div onDoubleClick={() => updateTodo.init({ title, completed, id, userId})} key={id}>
							<input type="checkbox" checked={completed} disabled/>
							{title}
						</div>
						}
						</Fragment>
					)
				})}
				<div>
					<NavLink to={`/product?page=${+(params.get('page') || `1`) - 1}`}>
						prev
					</NavLink>
					<NavLink to={`/product?page=${+(params.get('page') || `1`) + 1}`}>
						next
					</NavLink>
				</div>
			</div>
    )
})

export default Product