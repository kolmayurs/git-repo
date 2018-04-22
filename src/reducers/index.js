import {combineReducers} from 'redux';
import userData from './userData';
import repoData from './repoData';

export default combineReducers({
	userData,
	repoData
});