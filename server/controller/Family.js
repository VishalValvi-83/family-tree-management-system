import Family from './../model/Family.js';

export const postFamily = async (req, res) => {
    try {
        const { name, age, gender, dateOfBirth, relation, relatedToName } = req.body;
        const totalCount = await Family.countDocuments();

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

        if (!relation || !relatedToName) {
            return res.status(400).json({
                message: "Relation and relatedToName are required for linking to existing family",
            });
        }

        const relatedPerson = await Family.findOne({ name: relatedToName });
        if (!relatedPerson) {
            return res.status(404).json({
                message: `Related person '${relatedToName}' not found. Add them first or check the name.`,
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

        switch (relation.toLowerCase()) {
            case 'child':
                if (relatedPerson.gender === 'male') {
                    newMember.father = relatedPerson._id;
                } else if (relatedPerson.gender === 'female') {
                    newMember.mother = relatedPerson._id;
                }
                relatedPerson.children.push(newMember._id);
                break;

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