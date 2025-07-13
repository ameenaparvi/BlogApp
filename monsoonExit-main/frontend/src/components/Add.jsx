import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  var [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });
  useEffect(() => {
    if (state?.post) {
      setInputs({
        title: state.post.title || "",
        content: state.post.content || "",
        img_url: state.post.img_url || "",
      });
    }
  }, [state])
  const inputHandler = (e) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log("in",inputs);
  };
  console.log("Update ID:", state?.post?._id);

  const addData = async () => {
  try {
    if (state?.post) {
   
      await axios.put(`http://localhost:3001/update/${state.post._id}`, inputs);
      alert("Post updated successfully!");
    } else {
     
      await axios.post("http://localhost:3001/add", inputs);
      alert("Post added successfully!");
    }
    navigate("/");
  } catch (err) {
    console.error("Submit error:", err);
    alert("Failed to submit data");
  }
};

  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "600px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Title"
              onChange={inputHandler}
              name="title"
              value={inputs.title}
              fullWidth
            />
            <TextField
              variant="outlined"
              placeholder="content"
              onChange={inputHandler}
              name="content"
              value={inputs.content}
              multiline={4}
            />
            <TextField
              variant="outlined"
              placeholder="image url"
              onChange={inputHandler}
              name="img_url"
              value={inputs.img_url}
            />

            <Button variant="contained" color="secondary" onClick={addData}>
              Submit
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Add;
