import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import Page from '../pages/Page'
import Page2 from '../pages/Page2'
import RegisterPage from '../pages/RegisterPage'
import { Routes, Route } from 'react-router-dom'
import ProductsPage from '../pages/ProductsPage'
import ResetPassword from '../pages/ResetPassword'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoutes'
import AdminPage from '../pages/AdminPage'
import ChooseRole from '../pages/ChooseRole'
import DoctorFormFillup from '../pages/DoctorFormFillup'

const CustomRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/admin" element={<AdminPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/products/:id" element={<ProductsPage />} />
            <Route exact path="/choose-role" element={<ChooseRole />} />
            <Route exact path="/reset-password/:resetToken" element={<ResetPassword />} />

            {/* ---- Private Route ---- */}
            <Route path="" element={<PrivateRoute />}>
                <Route path="/page" element={<Page />} />
                <Route path="/page2" element={<Page2 />} />
            </Route>

            {/* ---- Admin Route ---- */}
            <Route path="" element={<AdminRoute />}>
                <Route path="/admin/page" element={<AdminPage />} />
                <Route path="/admin/doctor-form" element={<DoctorFormFillup />} />
            </Route>
        </Routes>
    )
}

export default CustomRoutes
