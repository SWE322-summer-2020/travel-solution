const mongoose = require("mongoose");
const validator = require("validator");

const storySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "A post must have a title"],
  },
  postBody: {
    type: String,
    required: [true, "A post must have a body"],
  },
  coverImage: {
    type: String,
    required: [true, "It's nice to have a cover image for the post"],
  },
  images: [String],
  area: [
    {
      name: String,
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      // required: [true, "Atleast one area is required"],
      foods: [String],
      sopts: [
        {
          name: String,
          // required: [true, "Atleast one spots is required"],
          type: {
            type: String,
            default: "Point",
            enum: ["Point"],
          },
          coordinates: [Number],
          permisions: [String],
          rulesAndRegulation: {
            type: String,
            maxLength: [200, "Maximum 200 charecter"],
          },
          policeInfo: [String],
        },
      ],
      hotels: [
        {
          name: String,
          type: {
            type: String,
            default: "Point",
            enum: ["Point"],
          },
          coordinates: [Number],
        },
      ],
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "A story must have a author"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  ratings: {
    type: Number,
    min: 1,
    max: 5,
  },

  // locations: [
  //   {
  //     type: {
  //       type: String,
  //       default: 'Point',
  //       enum: ['Point']
  //     },
  //     coordinates: [Number],
  //     address: String,
  //     description: String,
  //     day: Number
  //   }
  // ],
});

storySchema.virtual("comment", {
  ref: "Comment",
  foreignField: "story",
  localField: "_id",
});

const Story = mongoose.model("Story", storySchema);
module.exports = Story;
