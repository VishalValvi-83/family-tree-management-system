import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './updateTree.css'
import Header from '../Header/Header';
import { toast, ToastContainer } from 'react-toastify'
const UpdateTree = () => {

    const { _id } = useParams();
    // const [member, setMember] = useState({});
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

    // const [relationOfMember, setRelationOfMember] = useState('')


    const loadMember = async (_id) => {
        if (!_id) {
            console.error('Invalid ID')
            return
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-member/${_id}`)
            const data = response.data.data
            // setMember(data)
            console.log(data)
            const { name, age, dateOfBirth, gender } = data

            let setRelation = '';

            if (data.father || data.mother) {
                setRelation = 'child';
            } else if (data.children && data.children.length > 0) {
                setRelation = data.gender === 'male' ? 'father' : 'mother';
            } else {
                setRelation = '';
            }
            setFormData({
                name, age, dateOfBirth: new Date(dateOfBirth).toISOString().split('T')[0], gender,
                relation: setRelation,
                relatedToName: data.children?.[0]?.name || '',
                relatedToFatherName: data?.father?.name || '',
                relatedToMotherName: data?.mother?.name || ''
            })

        } catch (error) {
            console.log(error)
        }
    }

    const onValueChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const updateData = async (e) => {
        e.preventDefault();
        if (_id) {
            try {
                const response = await axios.patch(`${process.env.REACT_APP_API_URL}/update-member/${_id}`, formData)
                console.log(response.data)
                toast.success(response.data.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(() => {
                    toast.loading("Redirecting...")
                }, 3000);
                setTimeout(() => {
                    toast.dismiss()
                    window.location.pathname = '/'
                }, 4000);
            } catch (error) {
                console.log(error.message)
            }
        }
    }
    useEffect(() => {
        loadMember(_id)
    }, [_id])

    function notify() {
        toast.info("Update canceled.")
        setTimeout(() => {
            window.location.pathname = '/'
        }, 2000);
    }

    return (
        <>
            <Header />
            <div className='update-member-form'>
                <h1 className='heading'>Update Member's Details</h1>
                <form onSubmit={updateData} >
                    <div className="form-fields">
                        <label htmlFor="name">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={onValueChange}
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
                                onChange={onValueChange}
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
                                onChange={onValueChange}
                                required
                            />
                        </div>

                        <div className="form-fields">
                            <label htmlFor="gender">Gender:</label>
                            <select
                                name="gender"
                                id="gender"
                                value={formData.gender}
                                onChange={onValueChange}
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
                            onChange={onValueChange}
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
                                            onChange={onValueChange}
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
                                            onChange={onValueChange}
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
                                            onChange={onValueChange}
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
                                            onChange={onValueChange}
                                            required
                                        />
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div>
                        <button type="submit"  >Submit</button>
                        <Link className='cancel-btn'  onClick={notify} >Cancel</Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default UpdateTree