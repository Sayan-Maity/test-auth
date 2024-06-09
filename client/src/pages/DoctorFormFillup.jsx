import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useDoctorFormFillupMutation } from '../slices/userApiSlice';
import { useSelector } from 'react-redux';

const DoctorFormFillup = () => {
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        major: '',
        experience: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const {userInfo} = useSelector(state => state.user);
    const [doctorForm, {isLoading}] = useDoctorFormFillupMutation();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await doctorForm({email: userInfo.email, ...formData}).unwrap();
            setFormData({
                gender: '',
                age: '',
                major: '',
                experience: ''
            })
        }
        catch (err) {
            console.error(err);
        }
    };


    return (
        <div>
            <Navbar />

            <form
                onSubmit={handleFormSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1rem" }}>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" min="1" max="100" value={formData.age} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="major">Major:</label>
                    <input type="text" id="major" name="major" value={formData.major} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="experience">Years of Experience:</label>
                    <input type="number" id="experience" name="experience" min="0" max="50" value={formData.experience} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <button
                        onClick={handleFormSubmit}
                        type="submit">{isLoading ? 'Please Wait...' : 'Submit'}</button>
                </div>
            </form>
        </div>
    )
}

export default DoctorFormFillup
