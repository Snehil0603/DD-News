const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

// Route to create a new comment
router.post('/createComment', (req, res) => {
    const { writer, newsId, content } = req.body;

    const newComment = new Comment({
        writer,
        newsId,
        content
    });

    newComment.save((err, commentResult) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        res.status(200).json({ success: true, comment: commentResult });
    });
});

// Route to get all comments for a specific news article
router.get('/getComments/:newsId', (req, res) => {
    const { newsId } = req.params;

    Comment.find({ newsId })
        .sort({ createdAt: -1 }) // Sort by latest comments first
        .exec((err, comments) => {
            if (err) {
                return res.status(400).json({ success: false, err });
            }
            res.status(200).json({ success: true, comments });
        });
});

// Route to delete a comment
router.delete('/deleteComment/:commentId', (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.body; // Assuming the logged-in user's ID is passed in the request body

    // Find the comment by its ID
    Comment.findById(commentId)
        .then((comment) => {
            if (!comment) {
                return res.status(404).json({ success: false, message: "Comment not found" });
            }

            // Check if the user requesting the deletion is the writer of the comment
            if (comment.writer !== userId) {
                return res.status(403).json({ success: false, message: "You can only delete your own comments" });
            }

            // Proceed to delete the comment if the user is the writer
            Comment.findByIdAndDelete(commentId)
                .then(() => {
                    res.status(200).json({ success: true, message: "Comment deleted successfully" });
                })
                .catch((error) => {
                    console.error("Error deleting comment:", error);
                    res.status(400).json({ success: false, error });
                });
        })
        .catch((error) => {
            console.error("Error finding comment:", error);
            res.status(400).json({ success: false, error });
        });
});

router.put('/editComment/:commentId', (req, res) => {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    Comment.findById(commentId)
        .then((comment) => {
            if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });
            if (comment.writer !== userId) return res.status(403).json({ success: false, message: "You can only edit your own comments" });

            comment.content = content;
            comment.save()
                .then((updatedComment) => res.status(200).json({ success: true, updatedComment }))
                .catch((error) => res.status(400).json({ success: false, error }));
        })
        .catch((error) => res.status(400).json({ success: false, error }));
});

// Route to add a reply to a comment
router.post('/addReply', async (req, res) => {
    const { commentId, content, writer } = req.body;

    if (!commentId || !content || !writer) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        // Find the comment by ID and add the new reply to the replies array
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        // Push new reply into the replies array
        const newReply = {
            content,
            writer,
            createdAt: new Date()
        };

        comment.replies.push(newReply);
        await comment.save();

        res.status(200).json({ success: true, message: "Reply added successfully", comment });
    } catch (error) {
        console.error("Error adding reply:", error);
        res.status(500).json({ success: false, error });
    }
});

// Route to edit a reply
router.put('/editReply/:replyId', async (req, res) => {
    const { replyId } = req.params; // Extract replyId from URL
    const { content, userId } = req.body; // Get the content and userId from the body

    if (!content || !userId) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        // Find the comment that contains the reply
        const comment = await Comment.findOne({ 'replies._id': replyId });

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment or reply not found" });
        }

        // Find the reply within the comment
        const reply = comment.replies.id(replyId);

        if (!reply) {
            return res.status(404).json({ success: false, message: "Reply not found" });
        }

        // Check if the current user is the writer of the reply
        if (reply.writer !== userId) {
            return res.status(403).json({ success: false, message: "You are not authorized to edit this reply" });
        }

        // Update the reply content
        reply.content = content;
        await comment.save();

        res.status(200).json({ success: true, message: "Reply updated successfully", comment });
    } catch (error) {
        console.error("Error editing reply:", error);
        res.status(500).json({ success: false, error });
    }
});

// Route to delete a reply
router.delete('/deleteReply/:replyId', async (req, res) => {
    const { replyId } = req.params; // Extract replyId from URL
    const { userId } = req.body; // Get the userId from the body for authorization

    if (!userId) {
        return res.status(400).json({ success: false, message: "Missing userId" });
    }

    try {
        // Find the comment that contains the reply
        const comment = await Comment.findOne({ 'replies._id': replyId });

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment or reply not found" });
        }

        // Find the reply to delete
        const reply = comment.replies.id(replyId);

        if (!reply) {
            return res.status(404).json({ success: false, message: "Reply not found" });
        }

        // Check if the current user is the writer of the reply
        if (reply.writer !== userId) {
            return res.status(403).json({ success: false, message: "You are not authorized to delete this reply" });
        }

        // Remove the reply from the replies array
        reply.remove();
        await comment.save();

        res.status(200).json({ success: true, message: "Reply deleted successfully", comment });
    } catch (error) {
        console.error("Error deleting reply:", error);
        res.status(500).json({ success: false, error });
    }
});

router.post('/report', async (req, res) => {
    const { commentId, replyId } = req.body;

    try {
        if (replyId) {
            // Reporting a reply within a comment
            const comment = await Comment.findOne({ 'replies._id': replyId });

            if (!comment) {
                return res.status(404).json({ success: false, message: 'Reply not found' });
            }

            const reply = comment.replies.id(replyId);
            reply.reported = (reply.reported || 0) + 1;
            await comment.save();

            return res.status(200).json({ success: true, message: 'Reply reported successfully' });
        } else if (commentId) {
            // Reporting the comment itself
            const comment = await Comment.findById(commentId);

            if (!comment) {
                return res.status(404).json({ success: false, message: 'Comment not found' });
            }

            comment.reported = (comment.reported || 0) + 1;
            await comment.save();

            return res.status(200).json({ success: true, message: 'Comment reported successfully' });
        } else {
            return res.status(400).json({ success: false, message: 'Comment ID or Reply ID is required' });
        }
    } catch (error) {
        console.error('Error reporting:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
