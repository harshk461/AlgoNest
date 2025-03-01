"use client";

import { capitalize } from "@/app/functions/Utils";
import Editor from "@monaco-editor/react";
import {
  ChevronDown,
  CloudUpload,
  Code2,
  Dot,
  Play,
  Plus,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import Tooltip from "../Others/Tooltip";

const languages = ["javascript", "python", "cpp", "html", "css"];
const placeholders = {
  javascript:
    "// Write your JavaScript code here\nconsole.log('Hello, JavaScript!');",
  python: "# Write your Python code here\nprint('Hello, Python!')",
  cpp: '// Write your C++ code here\n#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, C++!";\n    return 0;\n}',
  html: "<!-- Write your HTML code here -->\n<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello, HTML!</title>\n</head>\n<body>\n    <h1>Hello, HTML!</h1>\n</body>\n</html>",
  css: "/* Write your CSS code here */\nbody {\n    background-color: #f0f0f0;\n    color: #333;\n    font-family: Arial, sans-serif;\n}",
};

const CodeEditor = () => {
  const [output, setOutput] = useState([]);
  const [fontSize, setFontSize] = useState(14);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "cpp"
  );
  const [code, setCode] = useState(placeholders[language]);
  const [_window, setWindow] = useState(1);
  const [loading, setLoading] = useState(false);
  const [testcases, setTestcases] = useState([
    {
      id: 1,
      input: {
        nums: [2, 7, 11, 15],
        target: 9,
      },
      expectedOutput: [0, 1],
    },
    {
      id: 2,
      input: {
        nums: [3, 2, 4],
        target: 6,
      },
      expectedOutput: [1, 2],
    },
    {
      id: 3,
      input: {
        nums: [3, 3],
        target: 6,
      },
      expectedOutput: [0, 1],
    },
  ]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey && event.key === "'") {
        event.preventDefault();
        handleExecute();
      }

      if (event.metaKey && event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    setCode(placeholders[newLanguage]);
  };

  const handleExecute = async () => {
    try {
      setLoading(true);
      setOutput([]); // Clear previous outputs
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
          testcases,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setOutput(result.results); // Store array of results
      } else {
        setOutput([{ error: result.error }]);
      }
    } catch (error) {
      setOutput([{ error: error.message }]);
    } finally {
      setWindow(1);
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setOutput([{ message: "Code submitted successfully!" }]);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-scroll">
      {/* Code Editor Section */}
      <div className="flex-1 flex flex-col">
        <div className="w-full flex gap-2 items-center px-4 py-2">
          <Code2 color="green" />
          <select
            id="language"
            value={language}
            onChange={handleLanguageChange}
            className="w-fit border-none bg-transparent outline-none font-semibold"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {capitalize(lang)}
              </option>
            ))}
          </select>

          <ChevronDown className="ml-auto self-end" />
        </div>

        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: fontSize,
          }}
        />
      </div>

      {/* Output Section */}
      <div className="w-full h-1/2 flex flex-col">
        <div className="h-fit px-4 border-b-[2px] border-b-primary">
          <button
            className={`px-4 py-2 font-semibold ${
              _window == 0 && "border-b-[2px] border-b-white"
            }`}
            onClick={() => setWindow(0)}
          >
            Test Case
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              _window == 1 && "border-b-[2px] border-b-white"
            }`}
            onClick={() => setWindow(1)}
          >
            Output
          </button>
        </div>

        {_window == 0 ? (
          <TestcaseWindow testcases={testcases} setTestcases={setTestcases} />
        ) : (
          <OutputWindow testcases={testcases} output={output} />
        )}

        <div className="w-full h-fit flex justify-end gap-4 px-[8px] py-[6px] border-t-[2px] border-t-primary">
          {loading ? (
            <div className="px-4 py-2 bg-primary font-semibold rounded-xl text-yellow-50 flex items-center gap-2">
              <div className="w-[25px] h-[25px] rounded-full border-4 border-secondary animate-spin border-b-primary"></div>
              Pending...
            </div>
          ) : (
            <>
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-primary font-semibold"
                onClick={() => handleExecute()}
              >
                <Play size={20} />
                Run
              </button>
              <button
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-primary font-semibold text-green-600"
                onClick={handleSubmit}
              >
                <CloudUpload color="#16a34a" size={20} />
                Submit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

const TestcaseWindow = ({ testcases, setTestcases }) => {
  console.log(testcases);
  const [curr, setCurr] = useState(0);

  // Add a new test case
  const handleAdd = () => {
    const newTestcase = {
      id: testcases.length + 1,
      input: { nums: [], target: 0 }, // Default values
      expectedOutput: [],
    };
    setTestcases([...testcases, newTestcase]);
    setCurr(testcases.length); // Switch to the newly added test case
  };

  // Remove a test case
  const handleRemove = (index) => {
    const updatedTestcases = testcases.filter((_, idx) => idx !== index);
    setTestcases(updatedTestcases);
    if (curr >= updatedTestcases.length) {
      setCurr(updatedTestcases.length - 1); // Adjust the current index if needed
    }
  };

  // Get the current test case
  const currentTestcase = testcases[curr];

  return (
    <div className="h-full w-full flex flex-col p-4 gap-4">
      {/* Test Case Tabs */}
      <div className="flex gap-4 flex-wrap">
        {testcases.map((_, index) => (
          <div key={index} className="relative">
            <div
              className={`px-4 py-1 rounded-lg cursor-pointer ${
                curr === index ? "bg-primary bg-opacity-65" : ""
              }`}
              onClick={() => setCurr(index)} // Switch to the selected test case
            >
              Case {index + 1}
            </div>
            <button
              className="absolute top-[-6px] right-[-6px] bg-primary rounded-full p-[1px]"
              onClick={() => handleRemove(index)}
            >
              <X size={15} className="text-white" />
            </button>
          </div>
        ))}
        {/* Add New Test Case */}
        <div className="h-full flex justify-center items-center ml-4">
          <Tooltip
            children={
              <Plus
                color="white"
                onClick={handleAdd}
                className="cursor-pointer text-primary hover:text-primary-dark"
              />
            }
            text={"Add New Testcase"}
          />
        </div>
      </div>

      {currentTestcase && (
        <div className="flex flex-col gap-2 rounded-lg">
          {Object.keys(currentTestcase.input).map((key) => (
            <div
              key={key}
              className="flex flex-col gap-2 items-start text-[14px]"
            >
              <h2 className="font-semibold text-md text-txt_primary">{key}:</h2>
              <input
                className="bg-primary p-2 w-full rounded-lg"
                value={`[${currentTestcase.input[key]}]`}
                onChange={(e) => {
                  const input = e.target.value;

                  const updatedValue = input
                    .replace(/^\[|\]$/g, "") // Remove the opening and closing square brackets
                    .split(",") // Split the string by commas
                    .map((item) => item.trim()); // Trim spaces around each item

                  setTestcases((prev) => {
                    const updatedTestcases = [...prev];
                    updatedTestcases[curr].input[key] = updatedValue; // Update the array
                    return updatedTestcases;
                  });
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OutputWindow = ({ testcases, output }) => {
  const [selectedCase, setSelectedCase] = useState(0);

  return (
    <div className="w-full h-full flex flex-col p-4 gap-4 overflow-x-scroll">
      {output?.length > 0 ? (
        <>
          <div className="flex items-center gap-4">
            <h1 className="text-[20px] font-bold text-[#2cbb5d]">Accepted</h1>
            <p className="text-txt_primary text-[14px] text-[#eff2f699]">
              Runtime: 0ms
            </p>
          </div>

          {/* Test case list */}
          <div className="flex w-full flex-wrap gap-4">
            {testcases.map((_, index) => (
              <div
                key={index}
                className={`px-4 py-1 rounded-lg font-semibold text-[14px] 
                flex-shrink-0 min-w-max flex items-center justify-between gap-2 
                hover:bg-primary duration-200 cursor-pointer ${
                  index === selectedCase ? "bg-primary" : ""
                }`}
                onClick={() => setSelectedCase(index)}
              >
                <div className="w-[5px] h-[5px] rounded-full bg-[#2cbb5d]"></div>
                <h1>Case {index + 1}</h1>
              </div>
            ))}
          </div>

          {/* Ensure selected test case exists */}
          {testcases[selectedCase] && (
            <>
              {Object.keys(testcases[selectedCase].input).map((key) => (
                <div
                  key={key}
                  className="flex flex-col gap-2 items-start text-[14px]"
                >
                  <h2 className="font-semibold text-md text-txt_primary">
                    {key}:
                  </h2>
                  <div className="bg-primary p-2 w-full rounded-lg">
                    {`[${testcases[selectedCase].input[key]}]`}
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-2 items-start text-[14px]">
                <h2 className="font-semibold text-md text-txt_primary">
                  Output:
                </h2>
                <div className="bg-primary p-2 w-full rounded-lg">
                  {JSON.stringify(output[selectedCase])}
                </div>
              </div>

              <div className="flex flex-col gap-2 items-start text-[14px]">
                <h2 className="font-semibold text-md text-txt_primary">
                  Expected Output:
                </h2>
                <div className="bg-primary p-2 w-full rounded-lg">
                  [1,2,3,4]
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center text-txt_secondary text-[14px] font-semibold">
          <h1>You must run your code first</h1>
        </div>
      )}
    </div>
  );
};
