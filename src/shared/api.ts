
type TodoDto = {
    userId: number
    id: number
    title: string
    completed: boolean
}

export const getTodos = async ({limit = 5, page = 1}: {limit?: number, page?: number}): Promise<TodoDto[]> => {
   const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`, {method: 'GET'})
   return response.json()
}
export const getTodo = async ({ id }: { id: number}): Promise<TodoDto[]> => {
   const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {method: 'GET'})
   return response.json()
}

export const createTodo = async (todo: {title: string, completed: boolean, userId: number}): Promise<TodoDto> => {
   const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`, { method: 'POST', body: JSON.stringify(todo)})
   return response.json()
}
export const updateTodo = async (todo: {title: string, completed: boolean, userId: number, id: number}): Promise<TodoDto> => {
   const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, { 
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
   })
   return response.json()
}