import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../actions/reduxActions';
import Loader from './Loading';

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
          <div key={'user_'+i}>
          <img src={users.avatar} alt={users.name} title={users.name} />
          <div className="user-name">{users.name}</div>
          <div className="user-description">{users.description}</div>
          </div>
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
          <div className="user-box">
          <Loader />
          </div> 
        )
      }


    /*if(this.props.userError){
        return(
          <h1>User Error...</h1>
        )
      }*/
      if(!this.props.user||this.props.user.length<0 || typeof this.props.user === 'undefined'){
        return(
          <h1>User Not Found</h1>
        )
      }
    return (
        <div className="user-box">
        {
          user
        }
        </div> 
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
