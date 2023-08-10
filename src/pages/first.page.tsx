import { observer } from "mobx-react-lite";
import { makeObservable, observable, action, computed, runInAction } from "mobx"

class Parent {
    value = 0
    x = 0
    y = 0
    array = [ 1, { value: 'value', nested: { value: 'nested value' } }]
    object = {
      value: 0,
      nested: {
        value: "nested value"
      }
    }
    constructor() {
        makeObservable(this, {
            value: observable,
            increment: action,
            decrement: action.bound,
            nestedObject: computed,
            changeX: action.bound,
            array: observable,
            x: observable,
            object: observable,
            changeObjectByRef: action
        })
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
}
const array = Array.from({ length: 5 }, (_, i) => i + 1)
export const parent = new Parent()
runInAction(() => {
  console.log(parent.array)
})
export const Page = observer(() => {
    return (
        <div>
            <button onClick={() => parent.changeX()}></button>
            <h1>x: {parent.x}</h1>
            <Container/>
            { array.map((_, index) => {
              return (
                <div key={index}>
                  <Todo increment={() => parent.increment()}/>
                </div>
              )
            })}
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
const Todo = observer(({increment }:{increment:() => void}) => {
  return (
    <div>
      <button onClick={increment}>
        Increment
      </button>
    </div>
  )
})