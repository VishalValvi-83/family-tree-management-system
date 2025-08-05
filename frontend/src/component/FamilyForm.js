import { useState } from 'react';
import './FamilyForm.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function FamilyForm() {
    // const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dateOfBirth: '',
        gender: '',
        relation: '',
        relatedToFatherName: '',
        relatedToMotherName: '',
        relatedToName: '',
    });

    // const getFamilyTree = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-members`);
    //         const data = response.data.data;
    //         setMembers(data);
    //     } catch (error) {
    //         console.error("Error fetching family tree:", error)
    //     }
    // }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addFamilyMember = async () => {
        try {
            let payload = {
                ...formData
            };

            if (formData.relation === 'child') {
                payload.relatedToName = '';
            } else {
                payload.relatedToFatherName = '';
                payload.relatedToMotherName = '';
            }

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-member`, payload);
            // alert(response.data.message);
            toast.success((response.data.message), {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                toast.loading("Loading member's details...");
            }, 1000);
            setTimeout(() => {
                window.location.reload();
            }, 2000);


            setFormData({
                name: '',
                age: '',
                dateOfBirth: '',
                gender: '',
                relation: '',
                relatedToFatherName: '',
                relatedToMotherName: '',
                relatedToName: '',
            });

        } catch (error) {
            alert(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        addFamilyMember();
    };

    // const notifySuccess = () => {
    //     toast.success("Success! Item added to cart.", {
    //         position: "top-center",
    //         autoClose: 3000,
    //         hideProgressBar: true,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //     });
    // };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-fields">
                <label htmlFor="name">Full Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
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
                        placeholder="Enter your age"
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
                                    required
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
                                    required
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
            <button type="submit"  >Submit</button>
            <ToastContainer />
        </form>
    );
}

export default FamilyForm;