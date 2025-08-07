import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FamilyTree.css';
import updateIcon from './../../assets/updatet-Icon.png'
import { Link } from 'react-router-dom';
import deleteIcon from './../../assets/deleteIcon.png'
import { toast } from 'react-toastify'

const FamilyTree = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchFamilyTree = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-members`);
                if (res.data.data.length > 0)
                    setMembers(res.data.data);
                setError(res.data.message)
            } catch (err) {
                console.error('Error fetching family tree:', err);
            } finally {
                setLoading(false);
            }
        };

        setTimeout(fetchFamilyTree, 1000);
    }, []);

    const handleDeleteMember = async (id) => {
        const confirmToDelete = window.confirm("Are you sure you want to delete this Member")
        if (confirmToDelete) {
            try {
                const res = await axios.delete(`${process.env.REACT_APP_API_URL}/delete-member/${id}`);
                if (res.data.message === 'Member deleted successfully') {
                    toast.success(res.data.message)
                    setTimeout(() => {
                        toast.dismiss()
                        toast.loading("Updating Family Tree...");
                    }, 2000);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } else
                    toast.error(res.data.message)
            } catch (err) {
                console.error('Error deleting member:', err);
            }
        }
    }

    const getMemberById = (id) => members.find((m) => m._id === id);

    const getGenderRole = (gender, type) => {
        if (type === 'child') {
            if (gender === 'male') return 'Son';
            if (gender === 'female') return 'Daughter';
            return 'Child';
        }
        if (type === 'sibling') {
            if (gender === 'male') return 'Brother';
            if (gender === 'female') return 'Sister';
            return 'Sibling';
        }
        return 'Unknown';
    };

    return (
        <div className="family-tree-box">
            <h2 className="heading">Family Tree</h2>
            <div className="family-tree">
                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : (members ? (members.map((member) => (
                    <div key={member._id} className={`family-tree-member ${member.gender === 'male' ? 'father' : 'mother'}`}>
                        <div className="family-tree-member-name">{member.name}</div>

                        {(member.father || member.mother) && (
                            <div className="relationship-section">
                                <h4>Parents</h4>
                                <div className="relationship-list">
                                    {member.father && (
                                        <div>
                                            <p className="member-name">{getMemberById(member.father)?.name || 'Unknown'}</p>
                                            <p className="member-role">Father</p>
                                        </div>
                                    )}
                                    {member.mother && (
                                        <div>
                                            <p className="member-name">{getMemberById(member.mother)?.name || 'Unknown'}</p>
                                            <p className="member-role">Mother</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {member.children?.length > 0 && (
                            <div className="relationship-section">
                                <h4>Children</h4>
                                <div className="relationship-list">
                                    {member.children.map((childId) => {
                                        const child = getMemberById(childId);
                                        return (
                                            child && (
                                                <div key={child._id}>
                                                    <p className="member-name">{child.name}</p>
                                                    <p className="member-role">{getGenderRole(child.gender, 'child')}</p>
                                                </div>
                                            )
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {member.siblings?.length > 0 && (
                            <div className="relationship-section">
                                <h4>Siblings</h4>
                                <div className="relationship-list">
                                    {member.siblings.map((sibId) => {
                                        const sibling = getMemberById(sibId);
                                        return sibling ? (
                                            <div key={sibling._id}>
                                                <p className="member-name">{sibling.name}</p>
                                                <p className="member-role">{getGenderRole(sibling.gender, 'sibling')}</p>
                                            </div>
                                        ) : (
                                            <p key={sibId}>Loading sibling data...</p>
                                        );
                                    })}
                                </div>

                            </div>

                        )}

                        <Link to={`/update-tree/${member._id}`} className='edit-tree-btn' >
                            <img src={updateIcon} alt='edit-tree-icon' />
                        </Link>

                        <img src={deleteIcon}
                            className='delete-tree-btn'
                            onClick={() => handleDeleteMember(member._id)}
                            alt='delete-icon' />
                    </div>
                )
                )
                ) : <div className='error-404'>
                    <h2>Member Not Found!</h2>
                    <p>{error}</p>
                </div>)
                }

            </div>
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            /> */}
        </div>
    );
};

export default FamilyTree;
