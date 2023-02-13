import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config({ path: './config.env' });

// Change the password in the database URI
const DATABASE = process.env.DATABASE_URI.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Connect to the database
mongoose.set('strictQuery', false);

mongoose.connect(DATABASE, { useNewUrlParser: true }).then(() => {
  console.log('\x1b[32m', '✅  Database connection successful!', '\x1b[0m');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('\x1b[36m', `⚙️  App running on port ${PORT}...`, '\x1b[0m');
});
