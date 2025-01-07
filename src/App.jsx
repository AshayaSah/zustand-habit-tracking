import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";
import LandingPage from "./components/LandingPage";
import FormPage from "./components/FormPage";

const App = () => {
  return (
    <>
      {/* Habit Tracker Part  */}
      {/* <Container>
        <Box>
          <Typography variant="h2" align="center">
            Habit Tracker
          </Typography>
          <AddHabitForm></AddHabitForm>
          <HabitList></HabitList>
        </Box>
      </Container> */}

      {/* Zustand Capabilities  */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
