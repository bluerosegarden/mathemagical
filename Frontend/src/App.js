import logo from "./phi.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import { Icon } from "@iconify-icon/react";
import MathOption from "./Components/MathOption";
import MathDownload from "./Components/MathDownload";
import Select from "react-select";

class MathData {
  id;
  math_type = "";
  min_num = 0;
  max_num = 0;
  min_rows = 0;
  constructor(id) {
    this.id = id;
  }
}

const initialMathData = [new MathData(0)];

function App() {
  const [showDownload, setShowDownload] = useState(false);
  const [mathData, setMathData] = useState(initialMathData);
  const [mathDataIdIndex, setMathDataIdIndex] = useState(1);

  const [fileType, setFileType] = useState("json");

  const fileTypes = [
    { value: "typst", label: "Typst" },
    { value: "json", label: "JSON" },
    { value: "csv", label: "CSV" },
  ];

  function addMathData() {
    console.log("Adding Math Data");
    setMathDataIdIndex(mathDataIdIndex + 1);
    let _mathData = [...mathData];
    _mathData.push(new MathData(mathDataIdIndex));
    setMathData(_mathData);
    setShowDownload(false);
  }

  function handleShowDownload() {
    setShowDownload(true);
  }
  function handleFileTypeChange(e) {
    switch (e.value) {
      case "typst":
        setFileType("typ");
        break;
      case "json":
        setFileType("json");
        break;
      case "csv":
        setFileType("csv");
        break;
      default:
        console.error("Handle File Change Error");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>A Mathemagical Math problem generator</p>
      </header>
      <div>
        {mathData.map((data) => (
          <MathOption
            id={data.id}
            key={data.id}
            mathData={mathData}
            setShowDownload={setShowDownload}
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
          {showDownload && (
            <MathDownload mathData={mathData} fileType={fileType} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
