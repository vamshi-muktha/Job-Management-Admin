const mongoose = require("mongoose");

// Load correct DB based on environment
const dburl = process.env.NODE_ENV === "production" ? process.env.ATLAS_URL : process.env.MONGO_URI;

async function main() {
  if (!dburl) {
    console.error("Database URL is undefined. Check your environment variables.");
    process.exit(1);
  }

  await mongoose.connect(dburl);
  console.log("Connected to MongoDB");
}

module.exports = main;
