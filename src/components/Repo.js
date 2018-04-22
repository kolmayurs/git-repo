import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchRepo} from '../actions/reduxActions';

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

class Repo extends React.Component {
  /*constructor(props){
    super(props);

    this.inputValue= this.inputValue.bind(this);
  }*/

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

  render() {
   

    const repo = this.props.repo.map((repos,i) => {
      if(repos){
      return(
          <h3 key={'repo_'+i}>{repos.name}</h3>
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
          <h1>Repo Loading...</h1>
        )
      }

      if(this.props.repoError){
        return(
          <h1>Repo Error...</h1>
        )
      }

      if(!this.props.repo ||this.props.repo.length<0 || typeof this.props.repo === 'undefined'){
        return(
          <h1>Repo Not Found</h1>
        )
      }

    return (
      <div className="Repo">
        {repo}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Repo);
