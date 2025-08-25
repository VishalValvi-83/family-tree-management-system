import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import familyRoutes from './routes/familyRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`Error connecting to DB: ${error}`);
    }
};
connection();

app.get('/', (req, res) => {
    res.send('Hello from server!');
});


app.use('/users', userRoutes);


app.use('/family', familyRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`)); 