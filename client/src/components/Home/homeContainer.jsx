import { connect } from 'react-redux'

import Home from './home';
import store from '../../store';

const mapStateToProps = (state) => {
  return {
    username: state.user.name
  }
}

const mapDispatchToProps = (dispatch, getState) => {
  return {
    getUser: () => {
      console.log(store.getState())
    }
  }
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home)
export default HomeContainer