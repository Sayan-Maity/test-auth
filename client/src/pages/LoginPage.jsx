import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgotPasswordMutation, useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/userSlice";
import { useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import { SERVER_URL } from "../constants/Url";

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const [forgotPassword, { isLoading: isLoadingPassword }] = useForgotPasswordMutation()


  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // since we are doing mutation, we need to unwrap the result
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/')
      // toast.success("Login successful")
    } catch (error) {
      // toast.error(error.data.message||error.message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      window.location.href = `${SERVER_URL}/auth/google/callback`
    } catch (error) {
      // toast.error(error.data.message||error.message)
      console.log(error)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    try {
      const res = await forgotPassword({ email }).unwrap()
      // toast.success(res.message)
    } catch (error) {
      // toast.error(error.data.message||error.message)
    }
  }

  return (
    <div>
      <Navbar />
      <h1>Login Page</h1>

      <form onSubmit={handleLogin}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='email' />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='email' />
          <button
            type="submit"
            onClick={handleLogin}
            disabled={isLoading}
          >{isLoading ? "Please wait..." : "Login"}</button>
        </div>
      </form>
      <button
        onClick={handleGoogleLogin}
      >Sign In with Google</button>
      <p>Forgot Password? <Link to="" onClick={handleForgotPassword} >Click here</Link></p>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>

    </div>
  )
}

export default LoginPage
