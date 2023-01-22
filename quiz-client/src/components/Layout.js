import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router";
import useStateContext from "../hooks/useStateContext";

export default function Layout() {
  const { resetContext } = useStateContext();
  const navigate = useNavigate();

  const logout = () => {
    resetContext();
    navigate("/");
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ width: 640, m: "auto" }}>
          <Typography variant="h4" align="center" sx={{ flexGrow: 1 }}>
            CybOlympiad Quiz-2023
          </Typography>
          <Button
            style={{
              color: "#223e42",
              fontFamily: "helvetica,serif",
              fontWeight: "bold",
              fontSize: "16px",
              textDecoration:"none",
              verticalAlign: "middle",
            //   button:hover{{"border: 1px solid #fafafa"}}
            }}
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
