import { makeAutoObservable } from "mobx"
import { updateTodo } from "../../shared/api"
import { TodosStore } from "../../entities/product//product.model"

export class UpdateTodo {
    userId: number|null = null
    title = ''
    completed = false
    id: number|null = null
  constructor(private todoStore: TodosStore) {
    makeAutoObservable(this, {}, {autoBind: true})
  }
  changeTitle(title: string){
    this.title = title
  }
  toggleCheckbox(){
    this.completed = !this.completed
  }
  init(todo: {title: string, completed: boolean, userId: number, id: number}) {
    this.title = todo.title
    this.completed = todo.completed
    this.id = todo.id
    this.userId = todo.userId
  }
  reset() {
    this.title = ''
    this.completed = false
    this.id = null 
    this.userId = null
  }
  async updateTodo(id: number) {
    if(!this.title || !id) return
    const todo = await updateTodo({ title: this.title, completed: this.completed, id, userId: 1})
    this.todoStore.updateTask(todo)
    this.reset()
  }
}