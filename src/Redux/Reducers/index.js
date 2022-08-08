import Auth from './Auth'
import Config from './Config'
import Hospital from './Hospital'
import Nursing from './Nursing'
import EMS from './EMS'
import { combineReducers } from 'redux'

export default combineReducers({
    Auth: Auth,
    Config: Config,
Hospital:Hospital,
Nursing:Nursing,
EMS:EMS
});
