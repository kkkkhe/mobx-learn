import { makeAutoObservable } from "mobx"
import { TodosStore } from "../../entities/product/product.model"
import { CreateTodo } from "../../features/todos/todo-create"
import { UpdateTodo } from "../../features/todos/todo-update"
class Page {
  variableForThisPage = 1
  constructor(
    readonly todo: TodosStore,
    readonly createTodo: CreateTodo,
    readonly updateTodo: UpdateTodo
    ){
    makeAutoObservable(this, {
      createTodo: false,
    })
  }
}
const todosStore = new TodosStore()
const createTodo = new CreateTodo(todosStore)
const updateTodo = new UpdateTodo(todosStore)
export const $$page = new Page(
  todosStore,
  createTodo,
  updateTodo
)