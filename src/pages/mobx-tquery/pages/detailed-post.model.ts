import { QueryClient } from "@tanstack/react-query"
import { MobxQuery } from "../../../shared/api/mobx-query"
import { Post } from "../type"
import { MobxMutation } from "../../../shared/api/mobx-mutation"

class PostStore {
  postQueryResult
  #queryClient = new QueryClient()
  constructor(){
    this.postQueryResult = new MobxQuery<Post>(this.#queryClient)
  }

  updatePost = new MobxMutation<
    unknown,
    unknown,
    { id: string, body: string, title: string, userId: number }
  >(this.#queryClient, {
    mutationFn: async (variable) => {
      return updatePost(variable)
    },
    onSuccess: (data, variable) => {
      this.#queryClient.invalidateQueries(['post', variable.id])
    }
  })

  getPost({ id }: { id: string }){
    return this.postQueryResult.query({
      queryKey: ['post', id],
      queryFn: () => getPost({id})
    })
  }
  dispose(){
    this.postQueryResult.dispose()
  }
}

export const detailedPost = new PostStore()

async function getPost({ id }: { id: string }): Promise<Post>{
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'GET'})
  return post.json()
}

async function updatePost({ id, title, body, userId }: { id: string, title: string, body: string, userId: number}){
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      body : body,
      userId: userId
    })
  })
  return response.json()
}