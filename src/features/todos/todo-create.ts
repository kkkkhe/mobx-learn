import { makeAutoObservable, runInAction } from "mobx";
import { Todo, TodoStore, todoStore } from "../../entities/todos/todo.model";

class CreateTodo {
  title: string = ''
  constructor(private store: TodoStore) {
    makeAutoObservable(this)
  }
  changeTitle = (title: string) => {
    this.title = title
    console.log(this.title)
  }
  createTodo = async () => {
    try {
      const response = await new Promise((res) => {
        setTimeout(() => res({id: this.store.todos.length + 1, text: this.title}),1000)
        // setTimeout(() => rej({message: 'failed to create task', status: 400}),1000)
      }) as Todo
      runInAction(() => {
        this.store.addTodo(response)
        this.title = ''
      }
      )
    } catch (error) {
      runInAction(() => {
        this.title = 'failed to create task'
      })
    }
  }
  
}
export const createTodo = new CreateTodo(todoStore)