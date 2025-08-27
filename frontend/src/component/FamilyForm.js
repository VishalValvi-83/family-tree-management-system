import { useState, useEffect } from 'react';
import './FamilyForm.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function FamilyForm() {
    const navigate = useNavigate();
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dateOfBirth: '',
        gender: '',
        relation: '',
        relatedTo: '',
        userId: ''
    });

    const getToken = () => JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const token = getToken();
                if (!token) {
                    navigate('/login');
                    return;
                }
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/family?userId=${token._id}`);

                if (res.data.data && res.data.data.length > 0) {
                    setMembers(res.data.data);
                }
            } catch (err) {
                console.error('Error fetching members:', err);
            }
        };
        fetchMembers();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const addFamilyMember = async () => {
            const token = getToken();
            if (!token) {
                toast.error("You must be logged in to add a family member.");
                navigate('/login');
                return;
            }

            let payload = {
                name: formData.name,
                age: formData.age,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                relation: formData.relation,
                relatedTo: formData.relatedTo,
                userId: token._id
            };
            console.log(payload)
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/family`, payload);

                toast.success(response.data.message || "Member added successfully!");
                navigate('/');

            } catch (error) {
                console.error("Error adding family member:", error);
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error("Your session has expired. Please log in again.");
                        navigate('/login');
                    } else {
                        toast.error(error.response.data.message || "An error occurred.");
                    }
                } else {
                    toast.error("An error occurred while adding the member.");
                }
            }
        };

        addFamilyMember();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-fields">
                <label htmlFor="name">Member's Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-fields-container">
                <div className="form-fields">
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Enter age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-fields">
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-fields">
                    <label htmlFor="gender">Gender:</label>
                    <select
                        name="gender"
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="" disabled selected>Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <div className="form-fields">
                <label htmlFor="relation">Relation:</label>
                <select
                    name="relation"
                    id="relation"
                    value={formData.relation}
                    onChange={handleChange}
                >
                    <option value="" disabled>Select relation</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="child">Child</option>
                    <option value="sibling">Sibling</option>
                </select>
            </div>

            {formData.relation === 'child' && (
                (members?.map((member) => (

                    <div className="form-fields">
                        <label htmlFor="relatedToFatherName">Father's Name:</label>
                        <input
                            type="text"
                            id="relatedToFatherName"
                            name="relatedToFatherName"
                            placeholder="Enter father's name"
                            value={formData.relatedToFatherName}
                            onChange={handleChange}
                        // required
                        />
                    </div>
                )))
            )}

            <button type="submit">Submit</button>
        </form>
    );
}

export default FamilyForm;