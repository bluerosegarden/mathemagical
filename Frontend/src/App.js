import logo from "./phi.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import Select from 'react-select';
import {Icon} from "@iconify-icon/react"

import init, { greet, grab_string } from "backend";

function testFunc(string) {
  init().then(() => {
    greet(string);
  });
}

function MathOption() {
  const [selectedOption, setSelectedOption] = useState([]);

  const [minNum, setMinNum] = useState([]);
  const [maxNum, setMaxNum] = useState([]);
  const [maxRows, setMaxRows] = useState([]);


  const options = [
    { value: 'addition', label: 'Addition' },
    { value: 'subtraction', label: 'Subtraction' },
    { value: 'multiplication', label: 'Multiplication' },
    { value: 'division', label: 'Division' },
  ];

  return (
      <div className="flex flex-col w-full items-center">
          <div className="w-2/6 bg-stone-200 rounded-lg text-lg">
            <div className="text-black flex flex-col content-center flex-wrap">
              <div className="p-4 flex flex-row">
                <Select
                  className="text-black text-left w-full"
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
                
              </div>
              <label for="min-num">Min Num</label>
                <input type="number" id="min-num" onChange={setMinNum}/>
                <label for="max-num">Max Num</label>
                <input type="number" id="max-num" onChange={setMaxNum} />
                <label for="min-rows">Min Rows</label>
                <input type="number" id="min-rows" onChange={setMaxNum} />
              Test
            </div>
        </div>
        <Icon
              className="text-green-500"
              height="4rem"
              icon="heroicons:plus-circle-16-solid"
            />
      </div>
      
      


    
  )
}


function App() {
  const [returnStr, setReturnStr] = useState([]);

  useEffect(() => {
    init().then(() => {
      setReturnStr(grab_string());
    });
  }, []);

  const blob = new Blob([returnStr], {
    type: "text/plain",
  });
  const fileUrl = URL.createObjectURL(blob);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Math problem generator
        </p>
        <a
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href={fileUrl}
          download="text.txt"
        >
          Download! Maybe!
        </a>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={()=>testFunc("alalaAGG")}
        >
          WASM TEST!!
        </button>
        <MathOption />
      </header>
      <div>
        
      </div>
    </div>
  );
}

export default App;
