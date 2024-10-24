"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import {
  TextField,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import Header from "@/components/Header";
import SendIcon from "@mui/icons-material/Send";
let socket;

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || ""); // Set username or default to empty string
  }, []);

  useEffect(() => {
    socket = io("http://localhost:4000"); // Correct server URL
    fetchComments();

    socket.on("new-comment", (comment) => {
      setComments((prev) => [ ...prev ,comment]);
    });

    return () => {
      socket.off("new-comment");
    };
  }, []);

  const fetchComments = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/comments");
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostComment = async () => {
    if (!newComment) {
      alert("Please type a message");
      return;
    }
    if (!username) {
      alert("Please log in");
      return;
    }

    try {
      const comment = { username, comment: newComment };
      await axios.post("http://localhost:4000/api/comments", comment);
      setNewComment(""); // Clear input after posting
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <>
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Scrollable area for comments */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", mt: 2 }}>
          <List>
            {comments.map((comment, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor:
                    comment.username === username ? "#e3f2fd" : "#e4f3fd", // Light blue for the current user's comment
                  borderRadius: "4px",
                  mb: 1, // Add margin-bottom for spacing
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <ListItemText
                    primary={`${comment.username}: ${comment.comment}`}
                    secondary={
                      <Typography
                        sx={{
                          textAlign: "right",
                          fontSize: "0.875rem",
                          color: "text.secondary",
                        }}
                      >
                        {new Date(comment.timestamp).toLocaleString()}
                      </Typography>
                    }
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Fixed Box for new comment input */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            backgroundColor: "white",
          }}
        >
          <TextField
            fullWidth
            label="Your Comment"
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ mr: 2 }} // Right margin for spacing
          />
          <Button
            variant="contained"
            onClick={handlePostComment}
            sx={{ p: 1.5 }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Container>
    </>
  );
}
