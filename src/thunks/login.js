import * as actions from '../actions/login';
import { getEntries } from './page';

export const handleLogin = () => (dispatch) => {
  dispatch(actions.loginRequest());
  // eslint-disable-next-line no-undef
  VK.Auth.login(r => {
      if (r.session){
          dispatch(actions.loginSuccess());
          dispatch(getEntries());
      } else {
          dispatch(actions.loginFail());
      }
  }, 0);
}
