import { makeAutoObservable, runInAction } from "mobx"
import { getTodos as getTodos } from "../../shared/api"

export interface Todo {
    id: number,
    userId: number
    title: string,
    completed: boolean
}
export class TodosStore {
    todos: Todo[] = []
    constructor(){
        makeAutoObservable(this)
    }
    async getTodos({ page, limit }: { page: number, limit?: number }) {
        const todos = await getTodos({ limit, page })
        runInAction(() => {
            this.todos = todos
        })
    }
    updateTask = (todo: Todo) => {
			const index = this.todos.findIndex(({ id }) => id === todo.id)
			this.todos[index] = todo
    }
		addTask = (todo: Todo) => {
			this.todos.push(todo)
		}
		reset(){
			this.todos = []
		}
}

export class TodoStore {

}