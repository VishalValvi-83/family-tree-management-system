import Family from '../model/Family.js';

const getFamilyTree = async (req, res) => {
    try {
        const familyMembers = await Family.find({ treeOwner: req.user.id });
        res.status(200).json(familyMembers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const addFamilyMember = async (req, res) => {
    try {
        const { name, relation, age, gender, dateOfBirth } = req.body;

        if (!name || !relation || !age || !gender || !dateOfBirth) {
            return res.status(400).json({ message: 'All fields (name, relation, age, gender, dateOfBirth) are required.' });
        }
        const newMember = new Family({
            name,
            relation,
            age,
            gender,
            dateOfBirth,
            treeOwner: req.user.id
        });

        const savedMember = await newMember.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateFamilyMember = async (req, res) => {
    try {
        const memberId = req.params.id;
        const { name, relation, age, gender, dateOfBirth } = req.body;

        const updateData = { name, relation, age, gender, dateOfBirth };

        const updatedMember = await Family.findOneAndUpdate(
            { _id: memberId, treeOwner: req.user.id },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedMember) {
            return res.status(404).json({ message: 'Member not found or you do not have permission.' });
        }

        res.status(200).json(updatedMember);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const deleteFamilyMember = async (req, res) => {
    try {
        const memberId = req.params.id;
        const deletedMember = await Family.findOneAndDelete(
            { _id: memberId, treeOwner: req.user.id }
        );

        if (!deletedMember) {
            return res.status(404).json({ message: 'Member not found or you do not have permission.' });
        }

        res.status(200).json({ message: 'Member deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export {
    getFamilyTree,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember
};