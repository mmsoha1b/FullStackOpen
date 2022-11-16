import loginService from "../services/login";
import blogService from "../services/blogs";
const Login = ({ username,setUsername,password,setPassword,setUser,setNotification,setError } ) => {
  const passwordHandler=(event) => {
    setPassword(event.target.value);
  };
  const usernameHandler=(event) => {
    setUsername(event.target.value);
  };
  const loginHandler = async(event) => {
    event.preventDefault();
    const credentials={ username:username,password:password };
    try{
      const user = await loginService.login(credentials);
      const userString = JSON.stringify(user);
      window.localStorage.setItem("loggedInUser",userString);
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification(`${user.username} signed in`);
      setTimeout(() => {
        setNotification("");
      },3000);
    }
    catch(exception){
      console.log(exception);
      const err = exception.message;
      setError(true);
      setNotification(err);
      setTimeout(() => {
        setNotification("");
        setError(false);
      },3000);
    }
  };
  return(
    <>
      <h2>login to application</h2>
      <form onSubmit={loginHandler}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          id="username-input"
          value={username}
          onChange={usernameHandler}
        />
        <br/>

        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id ="password-input"
          value={password}
          onChange={passwordHandler}
        />
        <br/>
        <button type ="submit" id="login-button">login</button>
      </form>
    </>
  );
};
export default Login;