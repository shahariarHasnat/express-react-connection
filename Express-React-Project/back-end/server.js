require('dotenv').config();  // Load environment variables
const express = require('express');
const { sequelize } = require('./config/config');  // Import Sequelize instance
const userRoutes = require('./routes/v1/userRoutes');
const app = express();

const cors = require('cors');

// CORS options to allow requests from specific origin
    const corsOptions = {
    origin: "http://localhost:3000", // The origin where your frontend (React) app is running
    };

app.use(cors(corsOptions));

//console.log('JWT Secret from .env:', process.env.JWT_SECRET);

app.use(express.json());

app.use('/', userRoutes);

// Sync the database and start the server
sequelize.sync()
  .then(() => {
    console.log('Database synced');
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log('Error syncing database:', err));

