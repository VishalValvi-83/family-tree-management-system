import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FamilyTree.css';
import updateIcon from './../../assets/updatet-Icon.png'

const FamilyTree = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFamilyTree = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-members`);
                setMembers(res.data.data);
            } catch (err) {
                console.error('Error fetching family tree:', err);
            } finally {
                setLoading(false);
            }
        };

        setTimeout(fetchFamilyTree, 1000);
    }, []);

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
                ) : (
                    members.map((member) => (
                        <div key={member._id} className={`family-tree-member ${member.gender === 'male' ? 'father' : 'mother'}`}>
                            <div className="family-tree-member-name">{member.name}</div>

                            {/* Parents */}
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

                            {/* Children */}
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

                            {/* Siblings */}
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
                            <div className='edit-tree-btn-container'>
                                <button className='edit-tree-btn' >
                                    <img src={updateIcon} alt='edit-tree-icon' />
                                </button>
                            </div>
                        </div>
                    ))
                )}

            </div>

        </div>
    );
};

export default FamilyTree;
