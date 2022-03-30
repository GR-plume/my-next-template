import * as switchbox from './reducers'
import { State } from './state'

function reducer(state: State = {}, action: any){
  // @ts-ignore
  const func = switchbox[action.type]
  if(!func) return state
  return func(state, action)
}

export default reducer