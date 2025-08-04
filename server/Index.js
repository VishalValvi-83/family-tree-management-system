import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { deleteFamilyMember, getAllFamilyMembers, getFamilyMember, postFamily } from './controller/Family.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
 
const connection = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL)
        console.log("Connected to MongoDB")

    } catch (error) {
        console.log(`${error}`)
    }
}
connection();

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.post('/add-member', postFamily)
app.get('/get-member/:_id', getFamilyMember)
app.get('/get-all-members', getAllFamilyMembers)
app.delete('/delete-member/:_id', deleteFamilyMember)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`)) 