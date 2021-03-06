import axios from 'axios'
import { returnErrors } from './errorAction'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
} from './types'

// check token and load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({type: USER_LOADING})

    

    axios.get('/api/auth/user', configToken(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err=> {
            dispatch(returnErrors(err.response.data, err.response.status ))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// register user
export const register = ({name, email, password}) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // request body
    const body = JSON.stringify({name, email, password})

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL' ))
            dispatch({
                type: REGISTER_FAIL
            })
        })

}
// login user
export const login = ({email, password}) => dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // request body
    const body = JSON.stringify({email, password})

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL' ))
            dispatch({
                type: LOGIN_FAIL
            })
        })

}

// logout
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// setup config header and token
export const configToken = getState => {
    // get token from localstorage
    const token = getState().auth.token;

    // header
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers['x-auth-token'] = token
    }

    return config
}