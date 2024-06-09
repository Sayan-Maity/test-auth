import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/userApiSlice'
import { setCredentials } from '../slices/userSlice'
import { useDispatch } from 'react-redux'
import Navbar from '../components/Navbar'
import { SERVER_URL } from '../constants/Url'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, { isLoading }] = useRegisterMutation()


  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await register({ name, email, password }).unwrap()
      dispatch(setCredentials({ ...res }))
      navigate('/choose-role')
      // toast.success("Register successful")
    } catch (error) {
      // toast.error(error.data.message||error.message)
    }
  }

  const handleGoogleRegister = async () => {
    try {
      window.location.href = `${SERVER_URL}/auth/google/callback`
    } catch (error) {
      // toast.error(error.data.message||error.message)
      console.log(error)
    }
  }

  return (
    <div>
      <Navbar/>
      <h1>Register Page</h1>

      <form onSubmit={handleRegister}></form>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Full Name' className='full-name' />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='email' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='email' />
        <button
          type="submit"
          onClick={handleRegister}
          disabled={isLoading}
        >{isLoading ? "Please Wait..." : "Register"}</button>
        <button
        onClick={handleGoogleRegister}
        >Sign Up with Google</button>
      </div>
      <p>Already have an account? <Link to="/login">Login in here</Link></p>

    </div>
  )
}

export default RegisterPage
