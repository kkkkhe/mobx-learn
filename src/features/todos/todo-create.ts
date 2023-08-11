import { makeAutoObservable } from "mobx";
import { createTodo } from "../../shared/api";
import { TodosStore } from "../../entities/product/product.model";

export class CreateTodo {
    title = ''
    completed = false
  constructor(private todo: TodosStore) {
    makeAutoObservable(this, {}, {autoBind: true})
  }
  changeTitle(title: string){
    this.title = title
  }
  toggleCheckbox(){
    this.completed = !this.completed
  }
  reset(){
    this.title = ''
    this.completed = false
  }
  async createTodo() {
    if(!this.title) return
    const todo = await createTodo({ title: this.title, completed: this.completed, userId: 1})
    this.todo.addTask({ title: this.title, completed: this.completed, userId: 1, id: todo.id })
    this.reset()
  }
}