import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import useHabitStore from "../store/Store";

const AddHabitForm = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const { habits, addHabit } = useHabitStore();

  console.log("Current Habits:", habits);

  const handleSubmit = (e) => {
    e.preventDefault(); // Fixed the missing parentheses
    if (name && frequency) {
      addHabit(name, frequency);
      setName("");
      setFrequency("daily"); // Reset frequency to default after adding
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Habit Name Input */}
        <TextField
          label="Enter a Habit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a Habit"
          fullWidth
        />

        {/* Frequency Selector */}
        <FormControl fullWidth>
          <InputLabel id="frequency-select-label">Frequency</InputLabel>
          <Select
            labelId="frequency-select-label"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            label="Frequency"
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
          </Select>
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary">
          Add Habit
        </Button>
      </Box>
    </form>
  );
};

export default AddHabitForm;
