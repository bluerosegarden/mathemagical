import { Icon } from "@iconify-icon/react";
import Select from "react-select";

export default function MathOption({
  id,
  mathData,
  setMathData,
  setShowDownload,
}) {
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
        data.problemCount = parseInt(e.target.value);
        setShowDownload(false);
        break;
      case "min-num":
        data.min_num = parseInt(e.target.value);
        setShowDownload(false);
        break;
      case "max-num":
        data.max_num = parseInt(e.target.value);
        setShowDownload(false);
        break;
      case "min-rows":
        data.min_rows = parseInt(e.target.value);
        setShowDownload(false);
        break;
      case "math-type":
        data.math_type = e.target.value;
        setShowDownload(false);
        break;
      default:
        console.error("What happened here?");
    }
    setMathData(_mathData);
  }

  function removeSelf() {
    console.log(`current id: ${id}`);
    let _mathData = [...mathData];
    _mathData = _mathData.filter((m) => m.id !== id);
    setMathData(_mathData);
    setShowDownload(false);
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
