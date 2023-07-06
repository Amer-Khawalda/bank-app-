const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
  console.log(`MongoDB is connected`);
};

module.exports = connectDB;