import { DESTROY_USER, SET_USERS, SET_LOADING, TOGGLE_USER} from './constants';
import axios from 'axios';


const setUsers = (users)=> {
  return {
    users,
    type: SET_USERS
  };
};

const setLoading = (loading)=> {
  return {
    type: SET_LOADING,
    loading
  };
};

const _destroyUser = (user)=> {
  return {
    type: DESTROY_USER,
    user
  };
};


const fetchUsers = ()=> {
  return async(dispatch)=> {
    dispatch(setLoading(true));
    const users = (await axios.get('/api/users')).data;
    dispatch(setLoading(false));
    return dispatch(setUsers(users));
  };
};

const destroyUser = (user)=> {
  return async(dispatch)=> {
    dispatch(setLoading(true));
    await axios.delete(`/api/users/${user.id}`);
    dispatch(setLoading(false));
    return dispatch(_destroyUser(user));
  };
};
const toggleUser = (user) => {
  const _user = !user.active
  const updatedUser = {...user, active:_user}
  return async(dispatch) => {
    dispatch(setLoading(true))
    await axios.put(`/api/users/${user.id}`, updatedUser)
    dispatch(setLoading(false))
    return dispatch({type: TOGGLE_USER, user:updatedUser})
  }
}
export { fetchUsers, destroyUser, toggleUser};
