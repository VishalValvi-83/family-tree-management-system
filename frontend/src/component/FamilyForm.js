import { useEffect, useState } from 'react';
import './FamilyForm.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function FamilyForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dateOfBirth: '',
        gender: '',
        relation: '',
        relatedToName: '',
        relatedToFatherName: '',
        relatedToMotherName: '',
        userId: ''
    });

    const getToken = () => JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        const token = getToken();
        if (!token) {
            return navigate('/login');
        }
        setFormData(prevState => ({
            ...prevState,
            userId: token?._id
        }));

    }, [navigate]);
    // useEffect(() => {
    //     const fetchMembers = async () => {
    //         try {
    //             const token = getToken();
    //             if (!token) {
    //                 navigate('/login');
    //                 return;
    //             } else {
    //                 setFormData(prevState => ({
    //                     ...prevState,
    //                     userId: token?._id
    //                 }));
    //             }
    //             const res = await axios.get(`${process.env.REACT_APP_API_URL}/family?userId=${token?._id}`);

    //             if (res.data.data && res.data.data.length > 0) {
    //                 setMembers(res.data.data);
    //             }
    //         } catch (err) {
    //             console.error('Error fetching members:', err);
    //         }
    //     };
    //     fetchMembers();
    // }, [navigate]);
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
            setIsLoading(true)
            let payload = {
                ...formData,
            };

            if (formData.relation === 'child') {
                payload.relatedToName = '';
            } else {
                payload.relatedToFatherName = '';
                payload.relatedToMotherName = '';
            }
            console.log(payload)
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/family`, payload);
                toast.success(response.data.message || "Member added successfully!",
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    }
                );
                setTimeout(() => {
                    toast.loading("Updating Family tree...");
                }, 1500);
                setTimeout(() => {
                    toast.dismiss();
                    window.location.reload();
                }, 2000);

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
            } finally {
                setIsLoading(false)
            }
        };

        addFamilyMember();
    };

    return (
        <form id='addFamilyMemberForm' onSubmit={handleSubmit}>
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

            <div className="form-fields">
                {
                    (formData.relation === 'child' && (
                        <>
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

                            <div className="form-fields">
                                <label htmlFor="relatedToMotherName">Mother's Name:</label>
                                <input
                                    type="text"
                                    id="relatedToMotherName"
                                    name="relatedToMotherName"
                                    placeholder="Enter mother's name"
                                    value={formData.relatedToMotherName}
                                    onChange={handleChange}
                                // required
                                />
                            </div>
                        </>
                    ))
                    || (
                        (formData.relation === 'mother' || formData.relation === 'father') && (
                            <div>
                                <label htmlFor="relatedToName">Child's Name:</label>
                                <input
                                    type="text"
                                    id="relatedToName"
                                    name="relatedToName"
                                    placeholder="Enter child's name"
                                    value={formData.relatedToName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )
                    )

                    || (
                        formData.relation === 'sibling' && (
                            <div>
                                <label htmlFor="relatedToName">Sibling's Name:</label>
                                <input
                                    type="text"
                                    id="relatedToName"
                                    name="relatedToName"
                                    placeholder="Enter sibling's name"
                                    value={formData.relatedToName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )
                    )
                }
            </div>

            <button type="submit">{isLoading ? 'Adding...' : 'Add Member'}</button>
        </form>
    );
}

export default FamilyForm;