import React, { FormEvent, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import app from 'firebase/app';
import 'firebase/database'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';


const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

app.initializeApp(config)


function Roster() {
  const columns: ColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'characterName', headerName: 'Name', width: 150 },
    { field: 'characterClass', headerName: 'Class', width: 150 },
  ];

  const [inputName, setInputName] = useState("")
  const [inputClass, setInputClass] = useState("")
  const [dataReadRaw, setDataReadRaw] = useState<any>({})
  const [dataExtracted, setDataExtracted] = useState<any>([])
  const [clearOpen, setClearOpen] = useState(false);
  const [keys, setKeys] = useState<any>([])
  const [idToRemove, setIdToRemove] = useState<any>([])
  const [NameToRemove, setNameToRemove] = useState('')

  const writeHandler = (event: FormEvent) => {
    event.preventDefault();
    writeData();
    setInputClass("")
    setInputName("")
  }

  const readHandler = (event: FormEvent) => {
    event.preventDefault();
    readData();
  }

  const removeHandler = (event: FormEvent) => {
    event.preventDefault();
    removeData(idToRemove);
  }

  const clearHandler = (event: FormEvent) => {
    event.preventDefault();
    resetData();
    clearCloser()
  }

  const clearOpener = () => {
    setClearOpen(true);
  };

  const clearCloser = () => {
    setClearOpen(false);
  };

  const writeData = () => {
    if (inputName === '' && inputClass === '') {
      alert('Insert valid name and class')
    } else if (inputClass === '') {
      alert('Insert valid Class')
    } else if (inputName === '') {
      alert('Insert valid Name')
    } else {
      app.database().ref('/').push({ Name: inputName, Class: inputClass });
    }
  }

  const readData = () => {
    app.database().ref('/').on('value', snapshot => {
      setDataReadRaw(snapshot.val());
    });

    setKeys(Object.keys(dataReadRaw))
    let data = []
    for (let i = 0; i < keys.length; i++) {
      data.push({ id: i, characterName: dataReadRaw[keys[i]].Name, characterClass: dataReadRaw[keys[i]].Class })
    }
    setDataExtracted(data)
    console.log(data)
  }

  const removeData = (id: number) => {
    app.database().ref('/' + keys[id]).remove()
  }

  const resetData = () => {
    app.database().ref('/').set('')
  }

  return (
    <div style={{ textAlign: "center", marginTop: "5em" }}>
      <form >
        <TextField
          style={{ width: '8em' }}
          label="Name"
          variant="outlined"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <FormControl variant="outlined">
          <InputLabel>Class</InputLabel>
          <Select
            style={{ width: '8em' }}
            value={inputClass}
            onChange={(e) => setInputClass(e.target.value as string)}
            label="Age"
          >
            <MenuItem value="Druid">Druid</MenuItem>
            <MenuItem value="Hunter">Hunter</MenuItem>
            <MenuItem value="Mage">Mage</MenuItem>
            <MenuItem value="Priest">Priest</MenuItem>
            <MenuItem value="Rogue">Rogue</MenuItem>
            <MenuItem value="Shaman">Shaman</MenuItem>
            <MenuItem value="Warlock">Warlock</MenuItem>
            <MenuItem value="Warrior">Warrior</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button
          style={{ margin: '1em auto' }}
          variant="contained"
          color="primary"
          onClick={writeHandler}
        >
          Add new player
        </Button>
      </form>
      <Button
        style={{ margin: '1em auto' }}
        variant="contained"
        color="primary"
        onClick={readHandler}
      >
        Update from Database
      </Button>
      <div style={{ margin: '3em auto', maxWidth: '600px', height: 400, width: '100%' }}>
        <DataGrid rows={dataExtracted} columns={columns} pageSize={5} />
      </div>
      {/*       <Autocomplete
        id="combo-box-demo"
        options={dataExtracted}
        getOptionLabel={(option: any) => option.characterName}
        style={{ width: 300, margin: '1em auto' }}
        //onChange={(e) => setNameToRemove(dataExtracted.characterName)}
        renderInput={(params) => <TextField {...params} label="Player to remove" variant="outlined" />}
      /> */}
      <TextField
        id="outlined-basic"
        label="Player ID to remove"
        variant="outlined"
        value={idToRemove}
        onChange={(e) => setIdToRemove(e.target.value)}
/>
      <br />
      <Button
        style={{ margin: '1em auto' }}
        variant="contained"
        color="primary"
        onClick={removeHandler}
      >
        Remove Player
      </Button>
      <br />
      <Button
        variant="contained"
        color="secondary"
        onClick={clearOpener}
      >
        Clear Data
      </Button>
      <Dialog
        open={clearOpen}
        onClose={clearCloser}
      >
        <DialogTitle id="alert-dialog-title">
          Clear Data?
          </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            You are about to clear your entire roster data. Continue?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearHandler} color="secondary">
            Clear
            </Button>
          <Button onClick={clearCloser} color="primary" autoFocus>
            Cancel
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Roster;
