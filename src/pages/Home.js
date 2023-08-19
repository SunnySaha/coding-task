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
import { collection, query, doc, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../utils/firebase";
import Notification from "../utils/notification";
import backgroundImage from "../../src/assets/background.jpeg";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [sectors, setSectors] = useState([]);
  const [allSectors, setAllSectors] = useState([]);
  const [termsConditions, setTermConditions] = useState(false);
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [btnText, setBtnText] = useState("Submit");
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (allSectors.length === 0) {
      fetchDefaultSectors();
    }
  }, [allSectors]);

  const fetchDefaultSectors = async () => {
    const q = query(collection(firestore, "Sections"));
    const querySnapshot = await getDocs(q);
    let arr = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      arr = [...arr, doc.data().section];
    });

    setAllSectors(arr);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        let obj = {
          name: options[i].text,
          value: options[i].value,
        };
        value.push(obj);
      }
    }
    setSectors(value);
  };

  const handleEdit = () => {
    setDisableBtn(false);
    setBtnText("Update Form");
    setIsUpdate(true);
  };

  const handleSubmit = async (e) => {
    console.log("is it here");
    e.preventDefault();
    setStatus("");
    setMsg("");

    if (userName.length === 0) {
      setStatus("warning");
      setMsg("Please enter your name");
    }

    if (sectors.length === 0) {
      setStatus("warning");
      setMsg("Choose sectors from selectbox");
    }

    if (!termsConditions) {
      setStatus("warning");
      setMsg("You need to agree terms");
    }

    const data = {
      Name: userName,
      Sectors: sectors,
      Terms: termsConditions,
    };

    if (!isUpdate) {
      try {
        const docRef = await addDoc(collection(firestore, "userData"), {
          userdata: data,
        });
        setStatus("success");
        localStorage.setItem("DocID", docRef.id);
        setDisableBtn(true);
      } catch (e) {
        setSectors("error");
        console.error("Error adding document: ", e);
      }
    } else {
      const refDoc = localStorage.getItem("DocID");

      try {
        const q = doc(collection(firestore, "userData"), refDoc);
        await updateDoc(q, data);
        setStatus("success");
        localStorage.setItem("DocID", refDoc);
        setDisableBtn(true);
      } catch (e) {
        setStatus("error");
        console.error("Error adding document: ", e);
      }
    }

  };

  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="App-header">
        <Box className="form-items">
          <TextField
            id="outlined-basic"
            disabled={disableBtn}
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            label="Name"
          />

          <Box className="form-items">
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
              <InputLabel shrink htmlFor="select-multiple-native">
                Sectors
              </InputLabel>
              <Select
                multiple
                native
                disabled={disableBtn}
                value={sectors.value}
                onChange={handleChangeMultiple}
                label="Sectors"
                inputProps={{
                  id: "select-multiple-native",
                }}
              >
                {allSectors.map((val, index) => (
                  <option key={`${val.name}_${index}`} value={val.value}>
                    {val.name}
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

            {disableBtn && (
              <Button variant="text" color="primary" onClick={handleEdit}>
                want to update form?
              </Button>
            )}

            <Box>
              <Button
                type="submit"
                disabled={disableBtn}
                className="submit-btn"
                color="success"
                variant="contained"
                onClick={handleSubmit}
              >
                {btnText}
              </Button>
            </Box>
          </Box>

          {status === "success" && (
            <Notification
              isOpen={true}
              severity="success"
              msg="Form Submission Successfull"
            />
          )}

          {status === "warning" && (
            <Notification isOpen={true} severity="warning" msg={msg} />
          )}

          {status === "error" && (
            <Notification
              isOpen={true}
              severity="error"
              msg="Something Error"
            />
          )}
        </Box>
      </header>
    </div>
  );
}
