import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../actions/reduxActions';

const mapStateToProps = (state) => {
  return {
    user: [state.userData.data],
    userFetching: state.userData.fetching,
    userError: state.userData.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({fetchUser}, dispatch)
  }
}

class User extends React.Component {
  /*constructor(props){
    super(props);

    this.inputValue= this.inputValue.bind(this);
  }*/

  componentDidMount(){
  this.props.fetchUser(this.props.inputValue);
  console.log(this.props.inputValue);
}

/*inputValue(e){
  this.props.fetchUser(e.target.value);
}*/

componentWillReceiveProps(nextProps) {
  console.log('USER:componentWillReceiveProps : ' +this.props.inputValue)
    if (nextProps.inputValue !== '' && this.props.inputValue !== nextProps.inputValue) {
        this.props.fetchUser(nextProps.inputValue);
    }
}

  render() {
    const user = this.props.user.map((users,i) => {
      if(users.name){
      return(
          <h1 key={'user_'+i}>{users.name}</h1>
        )
      }
      else{
        return(
          <h1 key={'user_'+i}>Name is null</h1>
        )
      }
    })  

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
      if(!this.props.user||this.props.user.length<0 || typeof this.props.user === 'undefined'){
        return(
          <h1>User Not Found</h1>
        )
      }
    return (
      <div className="user">
        {user}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
