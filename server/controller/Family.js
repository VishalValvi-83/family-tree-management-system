import Family from './../model/Family.js'

export const addFamilyMember = async (req, res) => {
    try {
        const {
            name,
            age,
            gender,
            dateOfBirth,
            relation,
            relatedToName,
            relatedToFatherName,
            relatedToMotherName,
            userId
        } = req.body

        const totalCount = await Family.countDocuments({ user: userId })

        //first member as the root of the family tree
        if (totalCount === 0) {
            const firstMember = await Family.create({
                name,
                age,
                gender,
                dateOfBirth: new Date(dateOfBirth),
                user: userId
            })
            return res.status(201).json({
                message: `Member will '${name}'saved as root.`,
                newMember: firstMember,
            })
        }

        const existingMember = await Family.findOne({ name, user: userId })
        if (existingMember) {
            return res.status(400).json({
                message: `Family member with the name '${name}' already exists. Please provide a unique name.`,
            })
        }

        const validRelationTypes = ['child', 'parent', 'sibling'];
        if (!validRelationTypes.includes(req.body.relation)) {
            return res.status(400).json({ message: 'Invalid relation type' });
        }

        if (relation.toLowerCase() === 'child') {

            const father = relatedToFatherName ? await Family.findOne({ name: relatedToFatherName, user: userId }) : null
            const mother = relatedToMotherName ? await Family.findOne({ name: relatedToMotherName, user: userId }) : null

            if (!father && !mother) {
                return res.status(404).json({ message: "At least one parent must be found." })
            }

            // Check if the related parents belong to a different user
            if (father && father.user.toString() !== userId) {
                return res.status(404).json({ message: "At least one parent must be found." })
            }
            if (mother && mother.user.toString() !== userId) {
                return res.status(404).json({ message: "At least one parent must be found." })
            }

            const newMember = await Family.create({
                name,
                age,
                gender,
                dateOfBirth: new Date(dateOfBirth),
                father: father ? father._id : null,
                mother: mother ? mother._id : null,
                siblings: [],
                user: userId
            })

            if (father) {
                father.children.push(newMember._id)
                await father.save()
            }
            if (mother) {
                mother.children.push(newMember._id)
                await mother.save()
            }

            let siblingIds = []
            if (father) siblingIds = siblingIds.concat(father.children)
            if (mother) siblingIds = siblingIds.concat(mother.children)

            siblingIds = siblingIds.filter(id => id.toString() !== newMember._id.toString())

            for (let id of siblingIds) {
                const sibling = await Family.findById(id)
                if (!sibling.siblings.includes(newMember._id)) {
                    sibling.siblings.push(newMember._id)
                    await sibling.save()
                }
                if (!newMember.siblings.includes(sibling._id)) {
                    newMember.siblings.push(sibling._id)
                }
            }
            await newMember.save()

            return res.status(201).json({
                message: "Child added with parents and siblings.",
                newMember,
            })
        }

        const newMember = new Family({
            name,
            age,
            gender,
            dateOfBirth: new Date(dateOfBirth),
            user: userId
        })
        const relatedPerson = await Family.findOne({ name: relatedToName, user: userId })
        if (!relatedPerson) {
            return res.status(404).json({
                message: `Related person '${relatedToName}' not found. Please add them first.`,
            })
        }

        switch (relation.toLowerCase()) {
            case 'father':
                newMember.children.push(relatedPerson._id)
                relatedPerson.father = newMember._id
                break
            case 'mother':
                newMember.children.push(relatedPerson._id)
                relatedPerson.mother = newMember._id
                break
            case 'sibling':
                newMember.siblings.push(relatedPerson._id)
                relatedPerson.siblings.push(newMember._id)
                break
            default:
                return res.status(400).json({ message: "Invalid relation type" })
        }

        await newMember.save()
        await relatedPerson.save()

        return res.status(201).json({
            message: "Family member created and linked successfully.",
            newMember,
        })

    } catch (error) {
        console.error("Error creating family member:", error)
        res.status(500).json({ message: error.message })
    }
}

export const getFamilyMember = async (req, res) => {
    try {
        const { _id } = req.params;
        const { userId } = req.query;

        const member = await Family.findOne({ _id, user: userId })
            .populate('father', 'name')
            .populate('mother', 'name')
            .populate('children', 'name')
            .populate('siblings', 'name');

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        res.json({
            message: 'Member is found',
            data: member
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllFamilyMembers = async (req, res) => {
    try {
        const { userId } = req.query;
        const totalCount = await Family.countDocuments({ user: userId })
        if (totalCount === 0) {
            return res.json({
                message: "Add the first family member, who will be the parent."
            })
        }
        const members = await Family.find({ user: userId })
        res.json({
            message: 'All family members',
            data: members
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

export const deleteFamilyMember = async (req, res) => {
    try {
        const { _id } = req.params
        const { userId } = req.body;

        const member = await Family.findOne({ _id, user: userId }).populate('siblings children')

        if (!member) {
            return res.status(404).json({ success: false, message: "Member not found" })
        }

        if (member.father) {
            await Family.findByIdAndUpdate(member.father, {
                $pull: { children: _id }
            })
        }

        if (member.mother) {
            await Family.findByIdAndUpdate(member.mother, {
                $pull: { children: _id }
            })
        }

        if (member.siblings && member.siblings.length > 0) {
            await Family.updateMany(
                { _id: { $in: member.siblings } },
                { $pull: { siblings: _id } }
            )
        }

        if (member.children && member.children.length > 0) {
            const updateField = member.gender === 'male' ? 'father' : 'mother'
            await Family.updateMany(
                { _id: { $in: member.children } },
                { $unset: { [updateField]: "" } }
            )
        }

        await Family.findByIdAndDelete(_id)

        return res.status(200).json({ success: true, message: "Member deleted successfully" })

    } catch (error) {
        console.error("Error deleting member:", error)
        return res.status(500).json({ message: error.message })
    }
}

export const updateFamilyMember = async (req, res) => {
    try {
        const { _id } = req.params
        const {
            name,
            age,
            gender,
            dateOfBirth,
            relation,
            relatedToName,
            relatedToFatherName,
            relatedToMotherName,
            userId
        } = req.body

        const member = await Family.findOne({ _id, user: userId })
        if (!member) {
            return res.status(404).json({ message: "Family member not found." })
        }

        if (name) member.name = name
        if (age) member.age = age
        if (gender) member.gender = gender
        if (dateOfBirth) member.dateOfBirth = new Date(dateOfBirth)

        if (relation && relation.toLowerCase() === "child") {
            const father = relatedToFatherName ? await Family.findOne({ name: relatedToFatherName, user: userId }) : null
            const mother = relatedToMotherName ? await Family.findOne({ name: relatedToMotherName, user: userId }) : null

            if (!father && !mother) {
                return res.status(404).json({ message: "At least one parent must be found." })
            }

            member.father = father ? father._id : null
            member.mother = mother ? mother._id : null

            if (father && !father.children.includes(member._id)) {
                father.children.push(member._id)
                await father.save()
            }
            if (mother && !mother.children.includes(member._id)) {
                mother.children.push(member._id)
                await mother.save()
            }

            let siblingIds = []
            if (father) {
                siblingIds = siblingIds.concat(father.children)
            }
            if (mother) {
                siblingIds = siblingIds.concat(mother.children)
            }
            siblingIds = siblingIds.filter(id => id.toString() !== member._id.toString())

            for (let sibId of siblingIds) {
                const sibling = await Family.findById(sibId)
                if (!sibling.siblings.includes(member._id)) {
                    sibling.siblings.push(member._id)
                    await sibling.save()
                }
                if (!member.siblings.includes(sibling._id)) {
                    member.siblings.push(sibling._id)
                }
            }
        }

        await member.save()
        return res.json({ message: "Family member updated successfully.", updatedMember: member })

    } catch (error) {
        console.error("Error updating family member:", error)
        res.status(500).json({ message: error.message })
    }
}