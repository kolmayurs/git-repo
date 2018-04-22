import axios from 'axios';

export function fetchUser(input){
	return function(dispatch){
		dispatch({type: 'START_FETCH_USER'})
		axios.get('https://github-user.now.sh/?username='+input)
		.then(res => {
			dispatch({type: 'RECEIVE_USER', payload: res.data})
		})
		.catch(err => {
			dispatch({type: 'START_FETCH_ERROR', payload: err})
		})
	}
}


export function fetchRepo(input){
	return function(dispatch){
		dispatch({type: 'START_FETCH_REPO'})
		axios.get('https://api.github.com/users/'+input+'/repos?access_token=95010da215609a05ea3964f4c34bd4ddda253c94')
		.then(res => {
			dispatch({type: 'RECEIVE_REPO', payload: res.data})
		})
		.catch(err => {
			dispatch({type: 'START_FETCH_ERROR', payload: err})
		})
	}

}