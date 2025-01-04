import { Box, Container, Typography } from "@mui/material";
import React from "react";
import AddHabitForm from "./components/AddHabitForm";
import HabitList from "./components/HabitList";

const App = () => {
  return (
    <>
      <Container>
        <Box>
          <Typography variant="h2" align="center">
            Habit Tracker
          </Typography>
          <AddHabitForm></AddHabitForm>
          <HabitList></HabitList>
        </Box>
      </Container>
    </>
  );
};

export default App;
