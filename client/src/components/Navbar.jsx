import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/userSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.user)
    const [logoutApi] = useLogoutMutation()

    const handleLogout = async () => {
        try {
            await logoutApi().unwrap()
            dispatch(logout())
            // navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    console.log(userInfo)

    return (
        <>
            {(userInfo == null || userInfo?.isAdmin == false)  && (
                <div style={{ width: "100%", padding: "1rem", backgroundColor: "#dedede", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
                        <Link to="/">Home</Link>
                        <Link to="/page">Page</Link>
                        <Link to="/page2">Page2</Link>
                    </div>
                    <p>|</p>
                    {userInfo ? (
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
                            <p>{userInfo?.name}</p>
                            <Link onClick={handleLogout}>Logout</Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}

                </div>
            )}

            {userInfo?.isAdmin == true  && (
                <div style={{ width: "100%", padding: "1rem", backgroundColor: "#dedede", display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
                        <Link to="/">Home</Link>
                        <Link to="/admin/page">AdminPage</Link>
                        <Link to="/admin/doctor-form">Doctor Form</Link>
                    </div>
                    <p>|</p>
                    {userInfo ? (
                        <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
                            <p>{userInfo?.name}</p>
                            <Link onClick={handleLogout}>Logout</Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}

                </div>

            )}
        </>
    )
}

export default Navbar
