import React, { useState, useEffect } from "react";
import init, { generate_math } from "backend";

export default function MathDownload({ mathData, fileType }) {
  const [mathCSVData, setMathCSVData] = useState("");
  const blob = new Blob([mathCSVData], {
    type: "text/plain",
  });

  // impl this later, focus on typst output first, then plain json, then csv
  //  let downloadName = "mathData." + fileType;

  let downloadName = "mathData.typ";

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
      download={downloadName}
    >
      download
    </a>
  );
}
