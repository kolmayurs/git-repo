  import React from 'react';
  //import {connect} from 'react-redux';
  //import {bindActionCreators} from 'redux';
  //import {fetchUser, fetchRepo} from '../actions/reduxActions';
  import User from './User';
  import Repo from './Repo';
  import '../css/style.css';
  import Logo from './Logo';
  import Loader from './Loading';

  /*const mapStateToProps = (state) => {
    return {
      user: [state.userData.data],
      userFetching: state.userData.fetching,
      userError: state.userData.error,
      repo: state.repoData.data,
      repoFetching: state.repoData.fetching,
      repoError: state.repoData.error,
    }
  }*/

  /*const mapDispatchToProps = (dispatch) => {
    return {
      ...bindActionCreators({fetchUser, fetchRepo}, dispatch)
    }
  }*/

  class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {inputValue: '', isLoading: false}
      this.inputValue= this.inputValue.bind(this);
    }

    componentDidMount(){
      this.setState({isLoading: false});
    /*this.props.fetchUser('kolmayurs');
    this.props.fetchRepo('kolmayurs');*/
  }

componentWillMount(){
   this.setState({isLoading: true});
}
  inputValue(e){
    this.setState({inputValue: e.target.value});
    /*this.props.fetchUser(e.target.value);
    this.props.fetchRepo(e.target.value);*/
  }

    render() {
      if(this.state.isLoading){
        return(<Loader />)
      }
     /* const user = this.props.user.map((users,i) => {

        if(this.props.userFetching){
          return(
            <h1>User Loading...</h1>
          )
        }
        if(this.props.userError){
          return(
            <h1>User Error...</h1>
          )
        }

        if(this.props.user.length===0 || this.props.user === undefined){
          return(
            <h1>User Not Found</h1>
          )
        }

        return(
            <h1 key={'user_'+i}>{users.name}</h1>
          )
      })
  */
      /*const repo = this.props.repo.map((repos,i) => {

        if(this.props.repoFetching){
          return(
            <h1>Repo Loading...</h1>
          )
        }
        if(this.props.repoError){
          return(
            <h1>Repo Error...</h1>
          )
        }

        return(
            <h3 key={'repo_'+i}>{repos.name}</h3>
          )
      })*/
      let userRepo =[];
      if(this.state.inputValue !== ''){
        userRepo =(<div>
           <User inputValue={this.state.inputValue} />
          <Repo inputValue={this.state.inputValue} />
          </div>)
      }
      else{
        userRepo =(<div className="user-box">Search Github Repository</div>)
      }
      return (
        <div className="App">
        <Logo />
          <div className="input-box">
            <input placeholder="Search Github Repository" onChange={this.inputValue.bind(this)} />
          </div>
         {userRepo}
        </div>
      );
    }
  }

  export default App;
  //export default connect(mapStateToProps, mapDispatchToProps)(App);
