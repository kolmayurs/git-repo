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
    this.state={key: '',currentPage:1, reposPerPage:30, orderId: false, orderName:false, orderOwner:false, orderStars:false, OrderCreated:false}
    this.sortById= this.sortById.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.repoNo = this.repoNo.bind(this);
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

handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
/*inputValue(e){
  this.props.fetchRepo(e.target.value);
}*/
sortById(keyValue){
  console.log('keyValue : ' +keyValue);
  this.setState({key: keyValue});
  //this.props.repo.sort(GetSortOrderLow(key));
 if(this.state.key === 'id_0' || this.state.key === 'id_1'){
    this.setState({orderId: !this.state.orderId});
   }

   if(this.state.key === 'name_0'|| this.state.key === 'name_1'){
    this.props.repo.sort(GetSortOrderLow("name"));
   }

    if(this.state.key === 'owner_0' || this.state.key === 'owner_1'){
    this.props.repo.sort(GetSortOrderLow("owner.login"));
   }

 if(this.state.key === 'stars_0' || this.state.key === 'stars_1'){
    this.setState({orderStars: !this.state.orderStars});
   }

    if(this.state.key === 'created_0' || this.state.key === 'created_1'){
    this.props.repo.sort(GetSortOrderLow("created_at"));
    this.setState({OrderCreated: !this.state.OrderCreated});
   }

}

repoNo(e){
  e.preventDefault(); 
  this.setState({reposPerPage:e.target.value});
}

  render() {
    if(this.props.repoFetching){
        return(
          <div className="repo-box">

          <Loader />
        
        </div>
        )
      }

const {currentPage, reposPerPage } = this.state;
 // Logic for displaying Repos
const indexOfLastRepo = currentPage * reposPerPage;
console.log(indexOfLastRepo);
const indexOfFirstRepo  = indexOfLastRepo  - reposPerPage;
console.log(indexOfFirstRepo);
const currentRepo = this.props.repo.slice(indexOfFirstRepo, indexOfLastRepo);
console.log(currentRepo);
// Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.props.repo.length / reposPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      if(this.state.currentPage === number){
       return (<li
               className="active_page"
                 key={number}
                 id={number}
                 onClick={this.handleClick}
               >
                 {number}
               </li>)

      }
      else{
        return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
      }
      
    });

    if(this.state.key === 'id_0'){
     this.props.repo.sort(GetSortOrderLow("id"));
   }
    if(this.state.key === 'id_1'){
    this.props.repo.sort(GetSortOrderHigh("id"));
   }
   if(this.state.key === 'name_0'){
    this.props.repo.sort(GetSortOrderLow("name"));
   }
   if(this.state.key === 'name_1'){
    this.props.repo.sort(GetSortOrderHigh("name"));
   }
    if(this.state.key === 'owner_0'){
    this.props.repo.sort(GetSortOrderLow("owner.login"));
   }
   if(this.state.key === 'owner_1'){
    this.props.repo.sort(GetSortOrderHigh("owner.login"));
   }
 if(this.state.key === 'stars_0'){
    this.props.repo.sort(GetSortOrderLow("stargazers_count"));
   }
   if(this.state.key === 'stars_1'){
    this.props.repo.sort(GetSortOrderHigh("stargazers_count"));
   }
    if(this.state.key === 'created_0'){
    this.props.repo.sort(GetSortOrderLow("created_at"));
   }
   if(this.state.key === 'created_1'){
    this.props.repo.sort(GetSortOrderHigh("created_at"));
   }

   let countRepo = 0;
    const repo = currentRepo.map((repos,i) => {
      if(repos !== [] || repos !== null){
        countRepo++;
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

    if(countRepo === 0){
      return(<div className="repo-box">
            <div className="no_repos">No Repos Found</div>
        
        </div>)
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
      const noRepos= [5, 10, 15, 20, 25, 30];
      const optionRepos = noRepos.map((repos,i) =>{
        if(this.state.reposPerPage === repos){
          return(<option selected key={'norepos_'+i} value={repos}>{repos}</option>)
        }
        else{
            return(<option selected key={'norepos_'+i} value={repos}>{repos}</option>)
        }
      })
    return (
      <div className="repo-box">
        <div className="repo_no">No. of Repos Per Page: <select onChange={this.repoNo.bind(this)}>
          {optionRepos}
        </select>
        </div>
         <table border="1" cellPadding="0" cellSpacing="0">
         <tbody>
          <tr>
            <td onClick={this.sortById.bind(this,(this.state.orderId? 'id_0' : 'id_1'))}>ID</td>
            <td onClick={this.sortById.bind(this,(this.state.orderName? 'name_0' : 'name_1'))}>Repo Title</td>
            <td onClick={this.sortById.bind(this,(this.state.orderOwner? 'owner_0' : 'owner_1'))}>Owner</td>
            <td onClick={this.sortById.bind(this,(this.state.orderStars? 'stars_0' : 'stars_1'))}>Stars</td>
            <td onClick={this.sortById.bind(this,(this.state.OrderCreated? 'created_0' : 'created_1'))}>Created</td>
          </tr>
            {repo}
            </tbody>
        </table>
        <ul>{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Repo);
