import React, { useReducer } from 'react'
import reducer from './reducer'
import { initialState } from './state'

const initialstate = initialState

const Store = React.createContext({} as any)

const Provider: React.FC = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialstate)
  return <Store.Provider value={{ state, dispatch }}>{ children }</Store.Provider>
}

export { Store, Provider }