import React, { FormEvent, useState } from 'react';
import Firebase from 'firebase'
import './App.css';
function App() {

  const [dataToWrite, setDataToWrite] = useState("Not set yet");


  const writeData = () => {
    Firebase.database().ref('/').set(dataToWrite);
    console.log('Data Saved');
  }

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log("Submitted");
    writeData()
  }

  return (
    <div style={{ textAlign: "center", marginTop: "5em" }}>
      <h2>
        Save to database
      </h2>
      <form onSubmit={submitHandler}>
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
    </div>
  )
}

export default App;
