import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Container,
  Box,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);
const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoad(true);
        const resp = await axios.get("http://localhost:3001/get");
        setPosts(resp.data);
        setLoad(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch posts");
        setLoad(false);
      }
    };
    fetchPost();
  }, []);
const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setPosts(posts.filter((post) => post._id !== id)); 
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete post");
    }
  };
    const handleUpdate = (post) => {
    navigate("/add", { state: { post } });
    }
  return (
    <Box sx={{ bgcolor: "white", minHeight: "100vh", py: 4 }}>
      <Container sx={{ mt: 4 }}>
        {error && (
          <Typography color="error" align="center" mb={2}>
            {error}
          </Typography>
        )}
        {load ? (
          <Typography align="center">Loading...</Typography>
        ) : (
          <Grid container spacing={4} justifyContent={"center"}>
            {posts.map((post, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    alt={post.title}
                    height="140"
                    image={
                      post.img ||
                      "https://via.placeholder.com/300x140.png?text=No+Image"
                    }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {post.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ backgroundColor: "purple", color: "white" }}
                      onClick={() => handleDelete(post._id)}
                    >
                      DELETE
                    </Button>
                    <Button
                      size="small"
                      sx={{ backgroundColor: "purple", color: "white" }}
                       onClick={() => navigate("/add", { state: { post } })}
                    >
                      UPDATE
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Home;
