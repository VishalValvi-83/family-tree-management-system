import Family from './../model/Family.js';

export const postFamily = async (req, res) => {
    try {
        const {
            name,
            age,
            gender,
            dateOfBirth,
            relation,
            relatedToName,
            relatedToFatherName,
            relatedToMotherName
        } = req.body;

        const totalCount = await Family.countDocuments();

        // 1. First member (root)
        if (totalCount === 0) {
            const firstMember = await Family.create({
                name,
                age,
                gender,
                dateOfBirth: new Date(dateOfBirth),
            });

            return res.status(201).json({
                message: `No existing members found. '${name}' saved as root (${gender === 'male' ? 'father' : 'mother'}).`,
                newMember: firstMember,
            });
        }

        if (!relation) {
            return res.status(400).json({
                message: "Relation and relatedToName are required for linking to existing family",
            });
        }

        const existingMember = await Family.findOne({ name });
        if (existingMember) {
            return res.status(400).json({
                message: `Family member with the name '${name}' already exists. Please provide a unique name.`,
            });
        }

        const newMember = new Family({
            name,
            age,
            gender,
            dateOfBirth: new Date(dateOfBirth),
        });

        if (relation.toLowerCase() === 'child') {
            const father = relatedToFatherName ? await Family.findOne({ name: relatedToFatherName }) : null;
            const mother = relatedToMotherName ? await Family.findOne({ name: relatedToMotherName }) : null;

            if (!father && !mother) {
                return res.status(404).json({ message: `At least one parent must be found.` });
            }

            if (father) {
                newMember.father = father._id;
                father.children.push(newMember._id);
                await father.save();
            }

            if (mother) {
                newMember.mother = mother._id;
                mother.children.push(newMember._id);
                await mother.save();
            }

            await newMember.save();

            return res.status(201).json({
                message: "Child added successfully with linked parents.",
                newMember,
            });
        }

        // For relations that require relatedToName
        const relatedPerson = await Family.findOne({ name: relatedToName });

        if (!relatedPerson) {
            return res.status(404).json({
                message: `Related person '${relatedToName}' not found. Please add them first.`,
            });
        }

        switch (relation.toLowerCase()) {
            case 'father':
                newMember.children.push(relatedPerson._id);
                relatedPerson.father = newMember._id;
                break;

            case 'mother':
                newMember.children.push(relatedPerson._id);
                relatedPerson.mother = newMember._id;
                break;

            case 'sibling':
                newMember.siblings.push(relatedPerson._id);
                relatedPerson.siblings.push(newMember._id);
                break;

            default:
                return res.status(400).json({ message: "Invalid relation type" });
        }

        await newMember.save();
        await relatedPerson.save();

        return res.status(201).json({
            message: "Family member created and linked successfully.",
            newMember,
        });

    } catch (error) {
        console.error("Error creating family member:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getFamilyMember = async (req, res) => {
    try {
        const { _id } = req.params;

        const member = await Family.findById(_id)
            .populate('father')
            .populate('mother')
            .populate('children')
            .populate('siblings');

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
        const members = await Family.find();
        res.json({
            message: 'All family members',
            data: members
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteFamilyMember = async (req, res) => {
    try {
        const { _id } = req.params;

        const member = await Family.findById(_id).populate('siblings children');

        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }

        // Remove this member from father's children
        if (member.father) {
            await Family.findByIdAndUpdate(member.father, {
                $pull: { children: _id }
            });
        }

        // Remove this member from mother's children
        if (member.mother) {
            await Family.findByIdAndUpdate(member.mother, {
                $pull: { children: _id }
            });
        }

        // Remove this member from siblings' sibling arrays
        if (member.siblings && member.siblings.length > 0) {
            await Family.updateMany(
                { _id: { $in: member.siblings } },
                { $pull: { siblings: _id } }
            );
        }

        // Set this member's children’s parent (father/mother) to null
        if (member.children && member.children.length > 0) {
            const updateField = member.gender === 'male' ? 'father' : 'mother';
            await Family.updateMany(
                { _id: { $in: member.children } },
                { $unset: { [updateField]: "" } }
            );
        }

        // Finally, delete the member
        await Family.findByIdAndDelete(_id);

        return res.status(200).json({ message: "Member deleted successfully" });

    } catch (error) {
        console.error("Error deleting member:", error);
        return res.status(500).json({ message: error.message });
    }
};