import logo from "./phi.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import Select from "react-select";
import { Icon } from "@iconify-icon/react";

import init, { greet, grab_string, generate_math } from "backend";

function MathDownload({ mathData }) {
  const [mathCSVData, setMathCSVData] = useState("");
  const blob = new Blob([mathCSVData], {
    type: "text/plain",
  });
  const fileUrl = URL.createObjectURL(blob);
  useEffect(() => {
    init().then(() => {
      setMathCSVData(generate_math(mathData));
    });
  }, [mathData]);

  return (
    <a
      className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      href={fileUrl}
      download="text.txt"
    >
      download
    </a>
  );
}

function MathOption({ id, mathData, setMathData }) {
  function handleSelectInputChange(e) {
    let newObject = {
      target: {
        id: "math-type",
        value: e.value,
      },
    };
    handleInputChange(newObject);
  }

  function handleInputChange(e) {
    console.log(e);
    const _mathData = [...mathData];
    const data = _mathData.find((m) => m.id === id);
    switch (e.target.id) {
      case "problem-count":
        data.problemCount = e.target.value;
        break;
      case "min-num":
        data.minNum = e.target.value;
        break;
      case "max-num":
        data.maxNum = e.target.value;
        break;
      case "min-rows":
        data.minRows = e.target.value;
        break;
      case "math-type":
        data.mathType = e.target.value;
        break;
      default:
        console.log("What happened here?");
    }
    setMathData(_mathData);
  }

  function removeSelf() {
    console.log(`current id: ${id}`);
    let _mathData = [...mathData];
    _mathData = _mathData.filter((m) => m.id !== id);
    setMathData(_mathData);
  }

  const options = [
    { value: "addition", label: "Addition" },
    { value: "subtraction", label: "Subtraction" },
    { value: "multiplication", label: "Multiplication" },
    { value: "division", label: "Division" },
  ];

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div className="w-2/6 bg-stone-200 rounded-lg text-lg relative my-4">
          {mathData.length > 1 && (
            <button className=" absolute top-1 right-1" onClick={removeSelf}>
              <Icon
                icon="uiw:circle-close"
                className="text-red-500"
                width="2rem"
              />
            </button>
          )}
          <div className="text-black flex flex-col content-center flex-wrap">
            <div className="p-4 flex flex-row">
              <Select
                className="text-black text-left w-full"
                defaultValue=""
                onChange={handleSelectInputChange}
                options={options}
              />
            </div>
            <label for="problem-count">Problem Count</label>
            <input
              type="number"
              id="problem-count"
              onChange={handleInputChange}
            />
            <label for="min-num">Min Num</label>
            <input type="number" id="min-num" onChange={handleInputChange} />
            <label for="max-num">Max Num</label>
            <input type="number" id="max-num" onChange={handleInputChange} />
            <label for="min-rows">Min Rows</label>
            <input type="number" id="min-rows" onChange={handleInputChange} />
            ID = {id}
          </div>
        </div>
      </div>
    </>
  );
}

class MathData {
  id;
  mathType = "";
  minNum = 0;
  maxNum = 0;
  minRows = 0;
  constructor(id) {
    this.id = id;
  }
}

const initialMathData = [new MathData(0)];

function App() {
  const [showDownload, setShowDownload] = useState(false);
  const [mathData, setMathData] = useState(initialMathData);
  const [mathDataIdIndex, setMathDataIdIndex] = useState(1);

  function addMathData() {
    console.log("Adding Math Data");
    setMathDataIdIndex(mathDataIdIndex + 1);
    let _mathData = [...mathData];
    _mathData.push(new MathData(mathDataIdIndex));
    setMathData(_mathData);
  }

  function handleShowDownload() {
    setShowDownload(true);
  }

  //make an array that contains an id, the data, and for each item in the array render a component that will edit that array's state. The only problem is I'm not sre how to handle an arbituary number of options. Maybe just let the component figure that out? since the options will change depending on the selection. Yes, That's how itll be done.

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Math problem generator</p>
      </header>
      <div>
        {mathData.map((data) => (
          <MathOption
            id={data.id}
            mathData={mathData}
            setMathData={setMathData}
          />
        ))}
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <button onClick={addMathData}>
            <Icon
              className="text-green-500"
              height="4rem"
              icon="heroicons:plus-circle-16-solid"
            />
          </button>
        </div>
        <div className="flex flex-row">
          <button
            className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded px-4"
            onClick={handleShowDownload}
          >
            Generate
          </button>
          {showDownload && <MathDownload mathData={mathData} />}
        </div>
      </div>
    </div>
  );
}

export default App;
