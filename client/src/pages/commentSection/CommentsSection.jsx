import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserCircle, FaEdit, FaTrash, FaReply, FaThumbsUp, FaTimes, FaSave, FaExclamationTriangle  } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import "./commentsSection.css";

const CommentsSection = ({ newsId, userId }) => {
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [replyContent, setReplyContent] = useState("");
    const [replyingToCommentId, setReplyingToCommentId] = useState(null);
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [editedReplyContent, setEditedReplyContent] = useState("");
    const [likedComments, setLikedComments] = useState({});
    const [likedReplies, setLikedReplies] = useState({});
    const [reportedComments, setReportedComments] = useState(() => {
        // Get the reported comments from localStorage or default to an empty object
        const storedReports = localStorage.getItem("reportedComments");
        return storedReports ? JSON.parse(storedReports) : {};
    });
    
    const [reportedReplies, setReportedReplies] = useState(() => {
        // Get the reported replies from localStorage or default to an empty object
        const storedReports = localStorage.getItem("reportedReplies");
        return storedReports ? JSON.parse(storedReports) : {};
    });
    
     // Array of 10 random RGB colors
    const colors = [
        "rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 206, 86)", "rgb(75, 192, 192)",
        "rgb(153, 102, 255)", "rgb(255, 159, 64)", "rgb(201, 203, 207)", "rgb(255, 99, 132)",
        "rgb(54, 235, 162)", "rgb(86, 255, 206)"
    ];

    const getRandomColor = () => {
        return colors[Math.floor(Math.random() * colors.length)];
    };

    useEffect(() => {
        fetchComments();
    }, [newsId]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/server/comment/getComments/${newsId}`);
            if (response.data.success) {
                const commentsWithLikes = await Promise.all(response.data.comments.map(async (comment) => {
                    const commentLikes = await getLikesCount(comment._id, null);
                    const likedByUser = await checkIfLikedByUser(comment._id, null);
                    const repliesWithLikes = await Promise.all(comment.replies.map(async (reply) => ({
                        ...reply,
                        likes: await getLikesCount(null, reply._id),
                        likedByUser: await checkIfLikedByUser(null, reply._id),
                    })));
                    return { ...comment, likes: commentLikes, likedByUser, replies: repliesWithLikes };
                }));
                setComments(commentsWithLikes);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const handleReport = async (commentId, replyId) => {
        const variable = { userId };
        if (commentId) variable.commentId = commentId;
        if (replyId) variable.replyId = replyId;
    
        // Check if already reported
        if (commentId && reportedComments[commentId]) return alert("You have already reported this comment.");
        if (replyId && reportedReplies[replyId]) return alert("You have already reported this reply.");
    
        try {
            await axios.post("http://localhost:5000/server/comment/report", variable);
    
            // Update localStorage for reported comments/replies
            if (commentId) {
                const updatedReportedComments = { ...reportedComments, [commentId]: true };
                setReportedComments(updatedReportedComments);
                localStorage.setItem("reportedComments", JSON.stringify(updatedReportedComments));
            }
            if (replyId) {
                const updatedReportedReplies = { ...reportedReplies, [replyId]: true };
                setReportedReplies(updatedReportedReplies);
                localStorage.setItem("reportedReplies", JSON.stringify(updatedReportedReplies));
            }
    
            fetchComments();
        } catch (error) {
            console.error("Error reporting:", error);
        }
    };
    

    const handleAddComment = () => {
        if (!commentContent.trim()) return alert("Please enter a comment");
        axios.post("http://localhost:5000/server/comment/createComment", {
            writer: userId, newsId, content: commentContent,
        }).then(() => {
            setCommentContent("");
            fetchComments();
        });
    };

    const handleDeleteReply = (replyId) => {
        axios.delete(`http://localhost:5000/server/comment/deleteReply/${replyId}`, {
            data: { userId },
        }).then(fetchComments).catch(error => console.error("Error deleting reply:", error));
    };

    const handleEditComment = (commentId) => {
        axios.put(`http://localhost:5000/server/comment/editComment/${commentId}`, {
            content: editedContent, userId
        }).then(() => {
            fetchComments();
            setEditingCommentId(null);
        });
    };

    const handleDeleteComment = (commentId) => {
        axios.delete(`http://localhost:5000/server/comment/deleteComment/${commentId}`, {
            data: { userId },
        }).then(fetchComments);
    };

    const handleReplySubmit = (commentId) => {
        axios.post("http://localhost:5000/server/comment/addReply", {
            writer: userId, newsId, content: replyContent, commentId
        }).then(() => {
            setReplyContent("");
            setReplyingToCommentId(null);
            fetchComments();
        });
    };

    const handleEditReply = (replyId) => {
        axios.put(`http://localhost:5000/server/comment/editReply/${replyId}`, {
            content: editedReplyContent, userId
        }).then(() => {
            fetchComments();
            setEditingReplyId(null);
        }).catch(error => {
            console.error("Error editing reply:", error);
        });
    };

    const handleToggleLike = async (commentId, replyId, liked) => {
        const variable = { userId };
        if (commentId) variable.commentId = commentId;
        if (replyId) variable.replyId = replyId;

        const endpoint = liked ? "unLike" : "upLike";
        try {
            await axios.post(`http://localhost:5000/server/like/${endpoint}`, variable);
            fetchComments();
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const getLikesCount = async (commentId, replyId) => {
        const variable = {};
        if (commentId) variable.commentId = commentId;
        if (replyId) variable.replyId = replyId;

        try {
            const response = await axios.post("http://localhost:5000/server/like/getLikes", variable);
            return response.data.success ? response.data.likes.length : 0;
        } catch (error) {
            console.error("Error fetching likes:", error);
            return 0;
        }
    };

    const checkIfLikedByUser = async (commentId, replyId) => {
        const variable = {};
        if (commentId) variable.commentId = commentId;
        if (replyId) variable.replyId = replyId;

        try {
            const response = await axios.post("http://localhost:5000/server/like/getLikes", variable);
            return response.data.success && response.data.likes.some(like => like.userId === userId);
        } catch (error) {
            console.error("Error checking if liked:", error);
            return false;
        }
    };

    const toggleCommentLike = (commentId, liked) => {
        setLikedComments(prevState => ({
            ...prevState,
            [commentId]: !liked,
        }));
        handleToggleLike(commentId, null, liked);
    };

    const toggleReplyLike = (replyId, liked) => {
        setLikedReplies(prevState => ({
            ...prevState,
            [replyId]: !liked,
        }));
        handleToggleLike(null, replyId, liked);
    };

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            <textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="Write a comment..." />
            <button onClick={handleAddComment}>Add Comment</button>
    
            {comments.map(comment => (
                <div key={comment._id} className="comment">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaUserCircle className="icon" style={{ color: getRandomColor() }} />
                        <p><strong>{comment.writer}</strong></p>
                        <p>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
                    </div>
                    <div style={{ marginLeft: '50px' }}>
                        <p>{comment.content}</p>
                        <div style={{ gap:'20px', display: 'flex' }}>
                            <div style={{ display: 'inline' }}>
                                <FaThumbsUp
                                    className={comment.likedByUser ? "liked iconss" : "not-liked iconss"}
                                    style={{ color: comment.likedByUser ? 'red' : 'gray' }}
                                    onClick={() => handleToggleLike(comment._id, null, comment.likedByUser)} />
                                {comment.likes}
                            </div>
                            {comment.writer === userId && (
                                <>
                                    <FaEdit className="iconss" onClick={() => setEditingCommentId(comment._id)} />
                                    <FaTrash className="iconss" onClick={() => handleDeleteComment(comment._id)} />
                                </>
                            )}
                            <FaReply className="iconss" onClick={() => setReplyingToCommentId(comment._id)} />
                            {comment.writer !== userId && <FaExclamationTriangle className="iconss"   style={{ cursor: reportedComments[comment._id] ? 'not-allowed' : 'pointer', opacity: reportedComments[comment._id] ? 0.5 : 1 }}
                         onClick={() => handleReport(comment._id, null)} title="Report" />}
                           
                        </div>
                        {editingCommentId === comment._id && (
                            <div>
                                <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                                <FaSave className="iconss" onClick={() => handleEditComment(comment._id)} />
                                <FaTimes className="iconss" onClick={() => setEditingCommentId(null)} />
                            </div>
                        )}
                        {replyingToCommentId === comment._id && (
                            <div>
                                <textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Write a reply..."
                                />
                                <FaReply className="iconss" onClick={() => handleReplySubmit(comment._id)} />
                                <FaTimes className="iconss" onClick={() => {
                                    setReplyContent("");
                                    setReplyingToCommentId(null);
                                }} />
                            </div>
                        )}
                    </div>
                    {comment.replies && comment.replies.map(reply => (
                        <div key={reply._id} className="reply" style={{ marginLeft: '30px', borderLeft: '1px solid #ccc', paddingLeft: '10px', marginTop: '10px' }}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <FaUserCircle className="icon" style={{ color: getRandomColor(), fontSize: '20px' }} />
                                <p><strong>{reply.writer}</strong></p>
                                <p>{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</p>
                            </div>
                            <div style={{ marginLeft: '50px' }}>
                                <p>{reply.content}</p>
                                <div style={{ display: 'flex',gap:'20px', marginTop: '5px' }}>
                                    <div>
                                        <FaThumbsUp
                                            className={reply.likedByUser ? "liked iconss" : "not-liked iconss"}
                                            style={{ color: reply.likedByUser ? 'red' : 'gray' }}
                                            onClick={() => handleToggleLike(null, reply._id, reply.likedByUser)} />
                                        {reply.likes}
                                    </div>
                                    {reply.writer === userId && (
                                        <>
                                            <FaEdit className="iconss" onClick={() => setEditingReplyId(reply._id)} />
                                            <FaTrash className="iconss" onClick={() => handleDeleteReply(reply._id)} />
                                        </>
                                    )}
                                    {reply.writer !== userId &&  <FaExclamationTriangle className="iconss" style={{ cursor: reportedReplies[reply._id] ? 'not-allowed' : 'pointer', opacity: reportedReplies[reply._id] ? 0.5 : 1 }} onClick={() => handleReport(comment._id, reply._id)} title="Report" />}
                                   
                                </div>
                                {editingReplyId === reply._id && (
                                    <div>
                                        <textarea value={editedReplyContent} onChange={(e) => setEditedReplyContent(e.target.value)} />
                                        <FaSave className="iconss" onClick={() => handleEditReply(reply._id)} />
                                        <FaTimes className="iconss" onClick={() => setEditingReplyId(null)} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
    
};

export default CommentsSection;
