import { useContext } from 'react'
import { Store } from '../store'

const A = () => {
  const { state, dispatch } = useContext(Store)

  const handleChange = (e: any) => {
    dispatch({
      type: 'setA',
      value: e.target.value
    })
  }

  return (
    <>
      <input type="text" onChange={handleChange} />
      <div>{ state.a }</div>
    </>
  )
}

export default A