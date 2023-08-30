import { QueryClient, MutationObserver, MutationObserverResult, MutationObserverOptions } from "@tanstack/react-query";
import { observable, runInAction, toJS } from "mobx";

export class MobxMutation<
  TData = unknown, 
  TError = unknown, 
  TVariables = void, 
  TContext = unknown
>{
  #queryClient: QueryClient
  observer?: () => void
  #result = observable({}, { deep: false}) as MutationObserverResult<TData, TError, TVariables, TContext>

  #defaultOptions: MutationObserverOptions<
    TData,
    TError,
    TVariables,
    TContext
  >

  constructor(client: QueryClient, options: MutationObserverOptions<
    TData,
    TError,
    TVariables,
    TContext
  > = {}
  ){
    this.#queryClient = client
    this.#defaultOptions = options 
  }
  get error(){
    return this.#result.error
  }

  get isLoading(){
    return this.#result.isLoading
  }

  get data(){
    return this.#result.data
  }

  get status() {
    return this.#result.status
  }
  mutate(variables: TVariables, options?: MutationObserverOptions<
    TData,
    TError,
    TVariables,
    TContext
    >){
    this.mutation(variables, options)
    return this.#result
  }
  mutation(variables: TVariables, options?: MutationObserverOptions<
    TData,
    TError,
    TVariables,
    TContext
    >){
      if(this.observer){
        this.observer()
      }
      const mutationOptions = Object.assign({}, this.#defaultOptions, options)
      console.log(mutationOptions)
      console.log(this.#defaultOptions)

      const observer = new MutationObserver(this.#queryClient, this.#defaultOptions)
      this.observer = observer.subscribe((result) => {
        runInAction(() => {
          console.log(result)
          Object.assign(this.#result, result)
        })
      })
      try {
        observer.mutate(variables, mutationOptions)
        return this.#result
      } 
      catch(err){
        console.log(err)
      }
  }
}