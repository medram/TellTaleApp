import axios from 'axios'

export function signIn(email, password)
{
    return axios.post('/auth', {email, password})
}
