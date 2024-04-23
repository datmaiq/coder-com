import React, { useState } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  Button,
  TextField,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";
import { editPost } from "./postSlice";
import ConfirmationDialog from "../../components/ConfirmationDialog";

function PostCard({ post }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    setConfirmDelete(true);
    // dispatch(deletePost(post._id));
  };
  const handleConfirmDelete = () => {
    dispatch(deletePost(post._id));
    setConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(editPost(post._id, editedContent));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(post.content);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography sx={{ margin: 3 }} variant="caption">
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <>
            <Button
              onClick={handleEdit}
              variant="contained"
              sx={{ marginRight: 3 }}
            >
              EDIT
            </Button>
            <Button
              onClick={handleDelete}
              sx={{ background: "red", color: "white" }}
            >
              DELETE
            </Button>
            <ConfirmationDialog
              open={confirmDelete}
              onClose={handleCancelDelete}
              onConfirm={handleConfirmDelete}
              title="Delete Post"
              content="Are you sure you want to delete this post?"
            />
          </>
        }
      />

      {isEditing ? (
        <>
          <TextField
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2, justifyContent: "flex-end" }}
          >
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
            <Button onClick={handleCancel} variant="outlined">
              Cancel
            </Button>
          </Stack>
        </>
      ) : (
        <Typography sx={{ mt: 2, marginLeft: 3 }}>{post.content}</Typography>
      )}

      {post.image && (
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            height: 300,
            "& img": { objectFit: "cover", width: 1, height: 1 },
          }}
        >
          <img src={post.image} alt="post" />
        </Box>
      )}

      <PostReaction post={post} />
      <CommentList postId={post._id} />
      <CommentForm postId={post._id} />
    </Card>
  );
}

export default PostCard;
