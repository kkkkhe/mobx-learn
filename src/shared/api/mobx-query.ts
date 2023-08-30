import { QueryClient, QueryObserverOptions, QueryObserver, QueryKey, QueryObserverResult } from '@tanstack/react-query';
import { observable, runInAction } from 'mobx';
export class MobxQuery <
  TQueryFnData = unknown, 
  Error = unknown, 
  TData = TQueryFnData, 
  TQueryData = TQueryFnData, 
  TQueryKey extends QueryKey = QueryKey
  >{
  #queryClient: QueryClient
  #defaultOptions: QueryObserverOptions<
    TQueryFnData,
    Error,
    TData,
    TQueryData,
    TQueryKey
  >
  observer?: () => void
  result = observable({}, { deep: false}) as QueryObserverResult<TQueryData, Error>
  constructor(clientQuery: QueryClient,  options: QueryObserverOptions<
    TQueryFnData,
    Error,
    TData,
    TQueryData,
    TQueryKey
  >
 = {}) {
    this.#queryClient = clientQuery
    this.#defaultOptions = options
  }

  query(options: QueryObserverOptions<
    TQueryFnData,
    Error,
    TData,
    TQueryData,
    TQueryKey
  > = {}){
    const queryOptions = Object.assign({}, this.#defaultOptions, options)
    if(!this.observer) {
      const observer = new QueryObserver(this.#queryClient, queryOptions)
       this.observer = observer.subscribe((result) => {
        runInAction(() => {
          Object.assign(this.result, result)
        })
      })
    }
    return this.result
  }

  dispose(){
    this.observer?.()
    delete this.observer
  }
}
