import { QueryClient } from '@tanstack/react-query';
import { MobxQuery } from "../../../shared/api/mobx-query";
import { Post } from '../type';
import { queryClient } from '../../../shared/query-client';

class PostsStore {
  postsResult
  
  constructor(client: QueryClient){
    this.postsResult = new MobxQuery(client, {
      queryKey: ['posts'],
      queryFn: getPosts
    })
  }

  get posts(){
    return this.postsResult.query()
  }

  dispose(){
    return this.postsResult.dispose()
  }
}

async function getPosts(): Promise<Post[]>{
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
  return posts.json()
}

export const postStore = new PostsStore(queryClient)