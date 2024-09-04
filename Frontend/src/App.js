import logo from "./phi.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import Select from "react-select";
import { Icon } from "@iconify-icon/react";

import init, { greet, grab_string, generate_math } from "backend";

function testFunc(string) {
  init().then(() => {
    greet(string);
  });
}

function MathDownload({
  selectedOption,
  problemCount,
  minNum,
  maxNum,
  maxRows,
}) {
  const [mathData, setMathData] = useState("");
  const blob = new Blob([mathData], {
    type: "text/plain",
  });
  const fileUrl = URL.createObjectURL(blob);
  useEffect(() => {
    init().then(() => {
      setMathData(
        generate_math(selectedOption, problemCount, minNum, maxNum, maxRows),
      );
    });
  }, [
    setMathData,
    mathData,
    selectedOption,
    problemCount,
    minNum,
    maxNum,
    maxRows,
  ]);
  //console.log(mathData);
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

function MathGenerate({
  selectedOption,
  problemCount,
  minNum,
  maxNum,
  maxRows,
  generatedMath,
  handleGeneratedMath,
}) {
  return (
    <div>
      <button
        className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleGeneratedMath}
      >
        Generate
      </button>

      {generatedMath && (
        <MathDownload
          selectedOption={selectedOption}
          problemCount={problemCount}
          minNum={minNum}
          maxNum={maxNum}
          maxRows={maxRows}
        />
      )}
    </div>
  );
}

function MathOption() {
  const [selectedOption, setSelectedOption] = useState("");

  const [problemCount, setProblemCount] = useState(0);
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(0);
  const [maxRows, setMaxRows] = useState(0);
  const [generatedMath, setGeneratedMath] = useState(false);

  function handleSelectedOption(e) {
    console.log(e);
    setSelectedOption(e.value);
    console.log(selectedOption);
    setGeneratedMath(false);
  }
  function handleMinNum(e) {
    console.log(e);
    setMinNum(e.target.value);
    console.log(e.target.value);
    setGeneratedMath(false);
  }
  function handleMaxNum(e) {
    setMaxNum(e.target.value);
    console.log(e.target.value);
    setGeneratedMath(false);
  }
  function handleMaxRows(e) {
    setMaxRows(e.target.value);
    console.log(e.target.value);
    setGeneratedMath(false);
  }
  function handleProblemCount(e) {
    setProblemCount(e.target.value);
    console.log(e.target.value);
    setGeneratedMath(false);
  }
  function handleGeneratedMath() {
    setGeneratedMath(true);
  }

  const options = [
    { value: "addition", label: "Addition" },
    { value: "subtraction", label: "Subtraction" },
    { value: "multiplication", label: "Multiplication" },
    { value: "division", label: "Division" },
  ];

  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-2/6 bg-stone-200 rounded-lg text-lg">
        <div className="text-black flex flex-col content-center flex-wrap">
          <div className="p-4 flex flex-row">
            <Select
              className="text-black text-left w-full"
              defaultValue={selectedOption}
              onChange={handleSelectedOption}
              options={options}
            />
          </div>
          <label for="problem-count">Problem Count</label>
          <input
            type="number"
            id="problem-count"
            onChange={handleProblemCount}
          />
          <label for="min-num">Min Num</label>
          <input type="number" id="min-num" onChange={handleMinNum} />
          <label for="max-num">Max Num</label>
          <input type="number" id="max-num" onChange={handleMaxNum} />
          <label for="min-rows">Min Rows</label>
          <input type="number" id="min-rows" onChange={handleMaxRows} />
          <MathGenerate
            selectedOption={selectedOption}
            problemCount={problemCount}
            minNum={minNum}
            maxNum={maxNum}
            maxRows={maxRows}
            generatedMath={generatedMath}
            handleGeneratedMath={handleGeneratedMath}
          />
          Test
        </div>
      </div>
      <Icon
        className="text-green-500"
        height="4rem"
        icon="heroicons:plus-circle-16-solid"
      />
    </div>
  );
}

function Products() {
  const products = [
    { title: "Cabbage", id: 1 },
    { title: "Garlic", id: 2 },
    { title: "Apple", id: 3 },
  ];
  const listItems = products.map((product) => (
    <li key={product.id}>{product.title}</li>
  ));
  return <ul>{listItems}</ul>;
}

function MyButton({ count, onClick }) {
  return (
    <button
      className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      butt {count}
    </button>
  );
}

function App() {
  const [returnStr, setReturnStr] = useState([]);

  useEffect(() => {
    init().then(() => {
      setReturnStr(grab_string());
    });
  }, []);

  function handleClick() {
    setCount(count + 1);
  }
  const [count, setCount] = useState(0);

  const blob = new Blob([returnStr], {
    type: "text/plain",
  });
  const fileUrl = URL.createObjectURL(blob);

  let content;
  let isLoggedIn = true;
  if (isLoggedIn) {
    content = <h1 className="text-black text-3xl">AAAA</h1>;
  } else {
    content = <h1 className="text-green-500 text-lg">BBBBBB</h1>;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Math problem generator</p>
        <a
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href={fileUrl}
          download="text.txt"
        >
          Download! Maybe!
        </a>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => testFunc("alalaAGG")}
        >
          WASM TEST!!
        </button>
        {content}
        <Products />
        <MathOption />
        <MyButton count={count} onClick={handleClick} />
        <MyButton count={count} onClick={handleClick} />
      </header>
      <div></div>
    </div>
  );
}

export default App;
