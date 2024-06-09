import { useNavigate } from "react-router-dom"
import { useUpdateIsAdminUserMutation } from "../slices/userApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { setCredentials } from "../slices/userSlice"
import Navbar from "../components/Navbar"

const ChooseRole = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [changeRole, { isLoading }] = useUpdateIsAdminUserMutation()
    const { userInfo } = useSelector(state => state.user)


    const handleChangeRole = async () => {
        try {
            await changeRole({ email: userInfo.email, isAdmin: true }).unwrap();

            const updatedUserInfo = { ...userInfo, isAdmin: true };
            console.log("Updated User Info", updatedUserInfo)
            dispatch(setCredentials(updatedUserInfo));
            console.log("Dispatched User Info")

            // Navigate to the admin page and reload the window
            navigate("/admin/page");
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    // console.log("here =>", userInfo)


    return (
        <>
            <Navbar />
            <div style={{ display: "flex" }}>
                <div style={{ border: "1px solid #dedede", padding: "1.5rem" }}>
                    <p>Want to surf as a ?</p>
                    <h1>Patient</h1>
                    <button onClick={() => navigate("/page")}>Proceed</button>
                </div>
                <div style={{ border: "1px solid #dedede", padding: "1.5rem" }}>
                    <p>Want to surf as a ?</p>
                    <h1>Doctor</h1>
                    <button
                        onClick={handleChangeRole}
                    >{isLoading ? "Please Wait..." : "Proceed"}</button>
                </div>
            </div>
        </>
    )
}

export default ChooseRole
