import express from 'express';
import { config } from 'dotenv';
import {connectMongoDB} from './db/config.js'
import geoDataRoutes from './routes/routes.js'

config();

const PORT = process.env.PORT || 3000;
const app = express();
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.2';

app.use('/api/geo-data', geoDataRoutes);

connectMongoDB(MONGODB_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is started at http://localhost:${PORT}`)
    })
})
