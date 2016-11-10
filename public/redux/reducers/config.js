// config.js
import { combineReducers } from 'redux'

const createAutoConfirm = (baseName) => {
  return (state = false, action) => {
    switch (action.type) {
      case `TOGGLE_AUTO_${baseName}`:
        return !state
      default:
        return state
    }
    return state
  }
}



const config =  combineReducers({
  autoConfirmNarration: createAutoConfirm('CONFIRM_NARRATION'),
})

export default config





