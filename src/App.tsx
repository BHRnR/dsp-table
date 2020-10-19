import React, { FormEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import app from 'firebase/app';
import 'firebase/database'
import './App.css';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { DataGrid, ColDef } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function App() {
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

  const clearOpener = () => {
    setClearOpen(true);
  };

  const clearCloser = () => {
    setClearOpen(false);
  };

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

  const resetHandler = (event: FormEvent) => {
    event.preventDefault();
    resetData();
    clearCloser()
  }

  const writeData = () => {
    app.database().ref('/').push({ Name: inputName, Class: inputClass });
  }

  const readData = () => {
    let ref = app.database().ref('/');
    ref.on('value', snapshot => {
      setDataReadRaw(snapshot.val());
    });
    let keys = Object.keys(dataReadRaw)
    let data = []
    for (let i = 0; i < keys.length; i++) {
      data.push({ id: keys[i], characterName: dataReadRaw[keys[i]].Name, characterClass: dataReadRaw[keys[i]].Class })
    }
    setDataExtracted(data)
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
          Add player
        </Button>
      </form>
      <Button
        style={{ margin: '1em auto' }}
        variant="contained"
        color="primary"
        onClick={readHandler}
      >
        Read Data
      </Button>
      <div style={{ margin: '3em auto', maxWidth: '600px', height: 400, width: '100%' }}>
        <DataGrid rows={dataExtracted} columns={columns} pageSize={5} />
      </div>
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
          <Button onClick={resetHandler} color="secondary">
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

export default App;
