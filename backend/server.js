import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const Activity = mongoose.model('Activity', new mongoose.Schema({
    domain: String,
    seconds: Number,
    timestamp: { type: Date, default: Date.now }
}));

// Top-level await for your version of Node
try {
    await mongoose.connect('mongodb://127.0.0.1:27017/productivityDB');
    console.log(" Database Connected");
} catch (err) {
    console.log(" DB Error", err);
}

app.post('/track', async (req, res) => {
    await new Activity(req.body).save();
    res.send("Saved");
});

app.get('/stats', async (req, res) => {
    const data = await Activity.find();
    res.json(data);
});

app.listen(5000, () => console.log("Server on 5000"));