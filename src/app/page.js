"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, TextField, Container } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  useEffect(()=>{
    const name = localStorage.getItem("username");
    if (name) {
      setUsername(name);
      router.push("/comments");
    }
  
  },[])
  const handleLogin = async () => {
    if (username) {
      const { data } = await axios.post("http://localhost:4000/api/login", { username });
      localStorage.setItem("sessionID", data.sessionID);
      localStorage.setItem("username", username);
      router.push("/comments");
    }
  };

  return (
    <>
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      
      <Container maxWidth="xs" sx={{ mt: 5 }} >
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Log In
        </Button>
      </Container>
      </div>
    </>
  );
}
