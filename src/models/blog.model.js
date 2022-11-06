const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: ''
    },
    tags: {
      type: [String],
      default: []
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    read_count: {
      type: Number,
      default: 0,
      required: true,
    },
    reading_time: {
      type: Number,
      required: true,
    },
    body: {
      type: String,
      default: '',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BlogSchema.pre("save", async function (next) {
  try {
    const words = await this.body.split(' ').length;
    const reading_time = await Math.round(words/200); // average reading words per minute
    this.reading_time = reading_time < 1 ? 0 : reading_time;  
    next();
  } catch (error) {
    next(error);
  }
});


module.exports = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
