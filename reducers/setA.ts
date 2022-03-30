import { State } from '../state'

export function setA(state: State, action: any){
  return { ...state, a: action.value }
}