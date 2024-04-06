import { createStore } from 'redux'

const reducer = (prevState,action)=>{
    console.log('reducer is called')
    return prevState
}
const store = createStore(reducer)
export default store
