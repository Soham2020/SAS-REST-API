const mongoose= require('mongoose');

const FeedbackSchema = new mongoose.Schema(
    {
        username: { type: String, required: true},
        Name: { type: String, required: true },
        Message: { type: String, required: true },
    }, { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);