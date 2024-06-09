import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useResetPasswordMutation } from "../slices/userApiSlice"
import { useState } from "react"

const ResetPassword = () => {
  const { resetToken } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleResetPassword = async e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match")
    } else {
      try {
        await resetPassword({ resetToken, password }).unwrap()
        // toast.success("Password Reset Successfully")
        navigate("/")
      } catch (error) {
        console.error(error)
        // toast.error(error?.data?.message || error?.error)
      }
    }
  }
  return (
    <div>
      <h1 >Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <div className="mb-4">
          <label htmlFor="email" className="text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-gray-700">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          type='submit'
          onClick={handleResetPassword}
        >
          {isLoading ? 'Please Wait...' : 'Submit'}
        </button>
      </form >
    </div>
  )
}

export default ResetPassword
