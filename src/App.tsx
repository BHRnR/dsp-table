import React, { FormEvent, useState } from 'react';
import app from 'firebase/app';
import 'firebase/database'
import './App.css';

function App() {

  const [inputName, setInputName] = useState("")
  const [inputClass, setInputClass] = useState("")
  const [dataRead, setDataRead] = useState({})

  const writeData = () => {
    app.database().ref('/').push({ Name: inputName, Class: inputClass });
  }

  const readData = () => {
    let ref = app.database().ref('/');
    ref.on('value', snapshot => {
      setDataRead(snapshot.val());
    });
  }

  const resetData = () => {
    app.database().ref('/').set('')
  }

  const printData = () => {
    const keys = Object.keys(dataRead)
    console.log(dataRead)
    console.log(keys)
  }

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
  }

  const printHandler = (event: FormEvent) => {
    event.preventDefault();
    printData();
  }

  return (
    <div style={{ textAlign: "center", marginTop: "5em" }}>
      <h2>
        Save to database
      </h2>
      <form >
        <input
          type="text"
          name="name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <select
          onChange={(e) => setInputClass(e.target.value)}
        >
          <option value="Druid">Druid</option>
          <option value="Hunter">Hunter</option>
          <option value="Mage">Mage</option>
          <option value="Priest">Priest</option>
          <option value="Rogue">Rogue</option>
          <option value="Shaman">Shaman</option>
          <option value="Warlock">Warlock</option>
          <option value="Warrior">Warrior</option>
        </select>
        <br />
        <input
          type="submit"
          value="Save"
          onClick={writeHandler}
        />
      </form >
      <br />
      <br />
      <h2>
        Read from database
      </h2>
      <input
        type="submit"
        value="Read"
        onClick={readHandler}
      />
      <br />
      <input
        type="submit"
        value="Reset Data"
        onClick={resetHandler}
      />
      <br />
      <input
        type="submit"
        value="Print Data"
        onClick={printHandler}
      />
    </div >
  )
}

export default App;
