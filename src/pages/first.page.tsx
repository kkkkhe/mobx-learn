import { observer } from "mobx-react-lite";
import {  runInAction, makeAutoObservable } from "mobx"

class Parent {
    value = 0
    x = 0
    y = 0
    name = ''
    array = [1,2,3,4,5,6]
    object = {
      value: 0,
      nested: {
        value: "nested value"
      }
    }
    constructor() {
      makeAutoObservable(this)
    }
    changeName (name: string) {
      this.name = name
    }
    get isShortName(){
      if(this.name.length < 4) {
        console.log('short name')
        return this.name.length
      }
      console.log('long name')
      return this.name.length 
    }
    get nestedObject(){
        return {
            x: this.x,
            y: this.y   
        }
    }
    changeObjectByRef() {
      this.object.value = 2
    }
    increment() {
        this.value++
    }
    decrement():void {
        this.value--
    }
    changeX() {
      this.x++;
    }
    changeArray(){
      this.array[6] = 7
    }
}


// const array = Array.from({ length: 5 }, (_, i) => i + 1)
export const parent = new Parent()
// reaction(() => parent.isShortName, (isShortName) => console.log('is short name', isShortName))
// autorun(() => {
//   parent.array.join(', ')
//   console.log('array changed')
// })

const name = import.meta.env.NAME
console.log('aisdjfaoisfd')
runInAction(() => {
  parent.array[1] = 123123
})
export const Page = observer(() => {
    return (
        <div>
          <div>Name: {name}</div>
          <button onClick={() => parent.changeArray()}>Change array</button>
            <button onClick={() => parent.changeX()}></button>
            <h1>x: {parent.x}</h1>
            <input value={parent.name} onChange={e => parent.changeName(e.target.value)}/>
            <Container/>
            {/* { array.map((_, index) => {
              return (
                <div key={index}>
                  <Todo increment={() => parent.increment()}/>
                </div>
              )
            })} */}
        </div>
    )
})
const Container = observer(() => {
  return (
    <div>
      Container
    </div>
  )
})
// const Todo = observer(({increment }:{increment:() => void}) => {
//   return (
//     <div>
//       <button onClick={increment}>
//         Increment
//       </button>
//     </div>
//   )
// })