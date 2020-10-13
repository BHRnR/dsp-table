import React, { FormEvent, useState } from 'react';
import app from 'firebase/app';
import 'firebase/database'
import './App.css';

function App() {

  const [dataToWrite, setDataToWrite] = useState("Not set yet");
  const [readData, setReadData] = useState("Not read yet")


  const writeData = () => {
    app.database().ref('/').set(dataToWrite);
    console.log('Data Saved');
  }

  const getData = () => {
    let ref = app.database().ref('/');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      setReadData(state);
    });
    console.log('Data retrieved');
  }

  const writeHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log('Submitted');
    writeData()
  }

  const readHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log('Read data');
    getData()
  }

  return (
    <div style={{ textAlign: "center", marginTop: "5em" }}>
      <h2>
        Save to database
      </h2>
      <form onClick={writeHandler}>
        <input
          type="text"
          name="name"
          value={dataToWrite}
          onChange={(v) => setDataToWrite(v.target.value)}
        />
        <input
          type="submit"
          value="Save"
        />
      </form >
      <br />
      <br />
      <h2>
        Read from database
      </h2>
      <form onClick={readHandler}>
        <input
          type="submit"
          value="Read Data" />
      </form>
      <h2>
        {readData}
      </h2>
    </div>
  )
}

export default App;
