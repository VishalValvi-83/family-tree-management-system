import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './FamilyTree.css'

const FamilyTree = () => {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)
    const getFamilyTree = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-all-members`);
            const data = response.data.data;
            setMembers(data);
        } catch (error) {
            console.error("Error fetching family tree:", error)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getFamilyTree()
            setLoading(false)
        }, 1000);
    }, [])
    console.log(members)
    return (
        <div className="family-tree-box">
            <h2 className="heading">Family Tree</h2>
            <div className="family-tree">
                {!loading ? (members?.map(member => (
                    <div key={member._id} className={`family-tree-member ${member.gender === 'male' ? 'father' : 'mother'}`}>
                        <div className="family-tree-member-name">{member.name}</div>
                        <p className="member-role">
                            {member.gender === 'male' ? 'Father' : member.gender === 'female' ? 'Mother' : 'Other'}
                        </p>
                        {member.children?.length > 0 && (
                            <div className="family-tree-children">
                                {member.children?.length > 0 && (
                                    <div className="family-tree-children">
                                        {member.children.map(childId => {
                                            const child = members.find(m => m._id === childId);
                                            return child ? (
                                                <div key={child._id}>
                                                    <p className="member-name">{child.name}</p>
                                                    <p className="member-role">
                                                        {child.gender === 'male' ? 'Son' : child.gender === 'female' ? 'Daughter' : 'Child'}
                                                    </p>
                                                </div>
                                            ) : (
                                                <p key={childId}>Loading child data...</p>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                        {member.siblings?.length > 0 && (
                            <div className="family-tree-siblings">
                                {member.siblings.map(siblingId => {
                                    const sibling = members.find(m => m._id === siblingId);
                                    return sibling ? (
                                        <div key={sibling._id}>
                                            <p className="member-name">{sibling.name}</p>
                                            <p className="member-role">
                                                {sibling.gender === 'male' ? 'Brother' : sibling.gender === 'female' ? 'Sister' : 'Sibling'}
                                            </p>
                                        </div>
                                    ) : (
                                        <p key={siblingId}>Loading sibling data...</p>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))) : (
                    <div className="loading-spinner">Loading...</div>
                )}
            </div>
            {/* <div className='family-tree'>
                <div >
                    <div className='family-tree'>
                        {members.map(member => (
                            <div key={member._id}>
                                <p className="member-name">{member.name}</p>
                                <p className="member-role">
                                    {member.gender === 'male' ? 'Father' : member.gender === 'female' ? 'Mother' : 'Other'}
                                </p>

                                {member.children?.length > 0 && (
                                    <div className="family-tree-children">
                                        {member.children.map(childId => {
                                            const child = members.find(m => m._id === childId);
                                            return child ? (
                                                <div key={child._id}>
                                                    <p className="member-name">{child.name}</p>
                                                    <p className="member-role">
                                                        {child.gender === 'male' ? 'Son' : child.gender === 'female' ? 'Daughter' : 'Child'}
                                                    </p>
                                                </div>
                                            ) : (
                                                <p key={childId}>Loading child data...</p>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div>

            </div> */}

        </div>
    )
}

export default FamilyTree;
