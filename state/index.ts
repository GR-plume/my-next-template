import { a } from './a'
import { b } from './b'
import { c } from './c'

export type State = (a & b & c) | {}

export const initialState: State = {
  ...a,
  ...b,
  ...c
}