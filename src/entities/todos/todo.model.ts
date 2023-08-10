import { makeAutoObservable, runInAction } from "mobx";
export type Todo = {
    id: number;
    text: string;
}
class TodosStore {
		isLoading = false
    todos = [] as Todo[] 
    constructor() { 
        makeAutoObservable(this)
        this.fetchTodos()
    }
   async fetchTodos(){
		this.isLoading = true
		const response  = await new Promise(res => {
			setTimeout(() => res([{id: 1, text: 'first'}, {id: 2, text: 'second'}]), 1000)
			})
		runInAction(() => {
			this.todos = response as Todo[]
			this.isLoading = false
		})
  }

	addTodo = (todo: { text: string, id: number }) => {
		this.todos.push(todo)
	}
	removeTodo = (todo: { id: number}) => {
		this.todos.filter(({id}) => id !== todo.id)
	}
}
export const todoStore = new TodosStore()
export type TodoStore = typeof todoStore