import React, { useState } from 'react';
import './FamilyForm.css';
import axios from 'axios';

function FamilyForm() {

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        dob: '',
        gender: '',
        relation: '',
        relatedToName: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addFamilyMember = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/add-member`, formData);
            console.log(response);

        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        addFamilyMember();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-fields">
                <label htmlFor="name">Full Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
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
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-fields">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
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
                        <option value="" disabled>Select gender</option>
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
                        <div>
                            <label htmlFor="relatedToName">Father's or Mother's Name:</label>
                            <input
                                type="text"
                                id="relatedToName"
                                name="relatedToName"
                                placeholder="Enter father's or mother's name"
                                value={formData.relatedToName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))

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

            <button type="submit">Submit</button>
        </form>
    );
}

export default FamilyForm;