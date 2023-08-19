import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  InputLabel,
  FormControl,
  Select,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import backgroundImage from "../../src/assets/background.jpeg";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [sectors, setSectors] = useState("");
  const [termsConditions, setTermConditions] = useState(false);

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  console.log("sectors", sectors, termsConditions, userName);

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSectors(value);
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="App-header">
        <Box className="form-items">
          <TextField
            id="outlined-basic"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            label="Name"
          />

          <Box>
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
              <InputLabel shrink htmlFor="select-multiple-native">
                Sectors
              </InputLabel>
              <Select
                multiple
                native
                value={sectors}
                onChange={handleChangeMultiple}
                label="Sectors"
                inputProps={{
                  id: "select-multiple-native",
                }}
              >
                {names.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box>
            <FormControlLabel
              required
              control={
                <Checkbox
                  checked={termsConditions}
                  onChange={(event) => setTermConditions(event.target.checked)}
                />
              }
              label="Agree to terms"
            />

            <Box>
              <Button
                type="submit"
                className="submit-btn"
                color="success"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </header>
    </div>
  );
}
