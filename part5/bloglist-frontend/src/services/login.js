import axios from 'axios';

const baseUrl = '/api/login'
const login = async(credentials)=>{ 
    const response = await axios.post(baseUrl,credentials);
    return response.data;
}
const logOut=(setUser)=>{
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
}
const loginService = {login,logOut}
export default loginService;