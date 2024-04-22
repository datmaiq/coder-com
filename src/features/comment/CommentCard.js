import React, { useState } from "react";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { useDispatch } from "react-redux";
import { deleteComment as deleteCommentAction } from "./commentSlice";
import ConfirmationDialog from "../../components/ConfirmationDialog";

function CommentCard({ comment }) {
  const dispatch = useDispatch();

  const [confirmDeleteComment, setConfirmDeleteComment] = useState(false);

  const handleDeleteComment = () => {
    setConfirmDeleteComment(true);
  };

  const handleConfirmDeleteComment = () => {
    dispatch(deleteCommentAction(comment._id));
    setConfirmDeleteComment(false);
  };

  const handleCancelDeleteComment = () => {
    setConfirmDeleteComment(false);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />

          <Button
            sx={{ background: "red", color: "white", margin: "10px" }}
            onClick={handleDeleteComment}
          >
            Delete
          </Button>
          <ConfirmationDialog
            open={confirmDeleteComment}
            onClose={handleCancelDeleteComment}
            onConfirm={handleConfirmDeleteComment}
            title="Delete Comment"
            content="Are you sure you want to delete this comment?"
          />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
