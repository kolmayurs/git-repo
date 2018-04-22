  import React from 'react';
  //import {connect} from 'react-redux';
  //import {bindActionCreators} from 'redux';
  //import {fetchUser, fetchRepo} from '../actions/reduxActions';
  import User from './User';
  import Repo from './Repo';

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
      this.state = {inputValue: 'kolmayurs'}
      this.inputValue= this.inputValue.bind(this);
    }

    componentDidMount(){
    /*this.props.fetchUser('kolmayurs');
    this.props.fetchRepo('kolmayurs');*/
  }

  inputValue(e){
    this.setState({inputValue: e.target.value});
    /*this.props.fetchUser(e.target.value);
    this.props.fetchRepo(e.target.value);*/
  }

    render() {
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

      return (
        <div className="App">
          <h1>awdx</h1>
          <input onChange={this.inputValue.bind(this)} />
          <User inputValue={this.state.inputValue} />
          <Repo inputValue={this.state.inputValue} />
        </div>
      );
    }
  }

  export default App;
  //export default connect(mapStateToProps, mapDispatchToProps)(App);
