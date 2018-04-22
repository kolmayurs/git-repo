export default function repoData(state={
	fetching: false,
	fetched: false,
	data: [],
	error: null
},action){
	switch(action.type){
		case 'START_FETCH_REPO' : {
			return {...state, fetching: true, fetched: false, error: null, data:[]}
		}
		case 'RECEIVE_REPO' : {
			return {...state, fetching: false, fetched: true, data: action.payload}
		}
		case 'START_FETCH_ERROR' : {
			return {...state, fetching: false, fetched: false, data:[], error:action.payload}
		}
		default : {
			return {...state}
		}
	}
}