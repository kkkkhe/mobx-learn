import { useQuery } from "@tanstack/react-query"
import { memo, useCallback, useRef, useState } from "react"
type InputType = {
  value: string,
  name: string
}
export const InputsPage = () => {
  const [value1, setValue] = useState<InputType[]>([
    {value: '', name: 'first'},
    {value: '', name: 'second'},
    {value: '', name: 'third'},
  ])
  const inputsRef = useRef<{name: string, value: string}[]>([])
  inputsRef.current = value1
  const onChange = useCallback(({value, name}: { value: string, name: string }) => { 
    const newValue = (inputsRef.current ?? []).map((item) => {
      return item.name === name ? {value, name} : item 
    })
    setValue(newValue)
  }, [setValue])
  return (
    <div>
      <Input name="first" onChange={onChange} value={value1[0].value} />
      <Input name="second" onChange={onChange} value={value1[1].value} />
      <Input name="third" onChange={onChange} value={value1[2].value} />
    </div>
  )
}


const Input = memo(({ name, onChange, value }: { name: string, onChange: ({value, name}: {value: string, name: string}) => void, value: string}) => {
  return (
    <input type="text" onChange={e => onChange({value: e.target.value, name})} value={value} />
  )
})