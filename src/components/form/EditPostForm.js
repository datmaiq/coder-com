import React, { useState } from "react";
import { Box, TextField, Button, Typography, makeStyles } from "@mui/material";
import { useDispatch } from "react-redux";
import { editPost } from "./postSlice";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

function EditPostForm({ post, onClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [content, setContent] = useState(post.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editPost(post._id, content));
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className={classes.form}>
      <Typography variant="h6" gutterBottom>
        Edit Post
      </Typography>
      <TextField
        multiline
        minRows={4}
        maxRows={8}
        variant="filled"
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
}

export default EditPostForm;
