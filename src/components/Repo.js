import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRepo} from '../actions/reduxActions';
import Loader from './Loading';

const mapStateToProps = (state) => {
  return {
    repo: state.repoData.data,
    repoFetching: state.repoData.fetching,
    repoError: state.repoData.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({fetchRepo}, dispatch)
  }
}

function GetSortOrderLow(prop) {  
    return function(a, b) {  
        if (a[prop] > b[prop]) {  
            return 1;  
        } else if (a[prop] < b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
}  

function GetSortOrderHigh(prop) {  
    return function(a, b) {  
        if (a[prop] < b[prop]) {  
            return 1;  
        } else if (a[prop] > b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
}  

class Repo extends React.Component {
  constructor(props){
    super(props);
    this.state={key: '',}
    this.sortById= this.sortById.bind(this);
  }

  componentDidMount(){
  this.props.fetchRepo(this.props.inputValue);
}

componentWillReceiveProps(nextProps) {
  console.log('REPO:componentWillReceiveProps : ' +nextProps.inputValue)
    if (nextProps.inputValue !== '' && this.props.inputValue !== nextProps.inputValue) {
        this.props.fetchRepo(nextProps.inputValue);
    }
}

/*inputValue(e){
  this.props.fetchRepo(e.target.value);
}*/
sortById(keyValue){
  this.setState({key: keyValue});
  //this.props.repo.sort(GetSortOrderLow(key));

}

  render() {
    if(this.state.key === 'id'){
    this.props.repo.sort(GetSortOrderLow("id"));
   }
   if(this.state.key === 'name'){
    this.props.repo.sort(GetSortOrderHigh("name"));
   }
    if(this.state.key === 'owner'){
    this.props.repo.sort(GetSortOrderLow("owner.login"));
   }
 if(this.state.key === 'stars'){
    this.props.repo.sort(GetSortOrderHigh("stargazers_count"));
   }
    if(this.state.key === 'created'){
    this.props.repo.sort(GetSortOrderLow("created_at"));
   }
    const repo = this.props.repo.map((repos,i) => {
      if(repos !== [] || repos !== null){
     return(
          <tr key={'repos_'+i}>
            <td>{repos.id}</td>
            <td>{repos.name}</td>
            <td>{repos.owner.login}</td>
            <td>{repos.stargazers_count}</td>
            <td>{repos.created_at}</td>
          </tr>
           )
      }
      else{
        return(
          <h3 key={'repo_'+i}>No Repos...</h3>
        )
      }
    })

    if(this.props.repoFetching){
        return(
          <div className="repo-box">

          <Loader />
        
        </div>
        )
      }
//movie_data.sort(GetSortOrderLow("vote_average"));
     /* if(this.props.repoError){
        return(
          <h1>Repo Error...</h1>
        )
      }*/

      if(!this.props.repo ||this.props.repo.length<0 || typeof this.props.repo === 'undefined'){
        return(
          <h1>Repo Not Found</h1>
        )
      }

    return (
      <div className="repo-box">
         <table border="1" cellPadding="0" cellSpacing="0">
         <tbody>
          <tr>
            <td onClick={this.sortById.bind(this,'id')}>ID</td>
            <td onClick={this.sortById.bind(this,'name')}>Repo Title</td>
            <td onClick={this.sortById.bind(this,'owner')}>Owner</td>
            <td onClick={this.sortById.bind(this,'stars')}>Stars</td>
            <td onClick={this.sortById.bind(this,'created')}>Created</td>
          </tr>
            {repo}
            </tbody>
        </table>
        
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Repo);
