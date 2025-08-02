import React, { useEffect } from 'react'
import axios from 'axios'
import './FamilyTree.css'
const FamilyTree = () => {
    const [members, setMembers] = React.useState([])


    const getFamilyTree = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-members`)
            const data = await response.json()
            console.log(data)
            setMembers(data.data)

        } catch (error) {
            console.error("Error fetching family tree:", error)
        }
    }
    useEffect(() => {
        getFamilyTree()

    }, [])
    console.log(process.env.REACT_APP_API_URL)


    return (
        <div className="family-tree-box">
            <h2 className="heading">Family Tree</h2>
            <div>
                <div className="family-tree">
                    <div className="family-tree-member">
                        {
                            members.map(member => (
                                <div key={member._id} className={`family-tree-member ${member.gender === 'male' ? 'father' : 'mother'}`}>
                                    <div className="family-tree-member-name">{member.name}</div>
                                    {
                                        member.children.length > 0 && (
                                            <div className="family-tree-children">
                                                {
                                                    member.children.map(child => (
                                                        <div key={child._id} className={`family-tree-member ${child.gender === 'male' ? 'father' : 'mother'}`}>
                                                            <div className="family-tree-member-name">{child.name}</div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FamilyTree