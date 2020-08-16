const Story = require("./../Models/storyModel");
const catchAsyncError = require("./../Utils/catchAsyncError");

exports.postAStory = catchAsyncError(async (req, res, next) => {
  // console.log(req.body);

  const newPost = await Story.create(req.body);

  res.status(201).json({
    status: "success",
    newPost,
  });
});
