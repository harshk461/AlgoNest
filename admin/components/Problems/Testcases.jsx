import axios from "axios";
import React, { useState, useEffect } from "react";

// KeyValueInput component
function KeyValueInput({
  keyName,
  type,
  value,
  onChange,
  onRemove,
  openTypeModal,
}) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Type (e.g., vector<int>)"
        className="px-4 py-2 bg-background rounded-lg text-foreground outline-none w-1/4 cursor-pointer"
        value={type}
        readOnly
        onClick={openTypeModal}
      />
      <input
        type="text"
        placeholder="Key"
        className="px-4 py-2 bg-background rounded-lg text-foreground outline-none w-1/4"
        value={keyName}
        onChange={(e) => onChange("key", e.target.value)}
      />
      <input
        type="text"
        placeholder="Value"
        className="px-4 py-2 bg-background rounded-lg text-foreground outline-none flex-1"
        value={value}
        onChange={(e) => onChange("value", e.target.value)}
      />
      <button
        onClick={onRemove}
        className="px-3 py-2 bg-background rounded-lg text-foreground hover:opacity-80"
      >
        Remove
      </button>
    </div>
  );
}

function TypeVariableModal({ setTypeModal, onTypeSelect }) {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3090/problems/all-variable-types")
      .then((res) => {
        setTypes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filteredTypes = types.filter(type => {
    const query = searchQuery.toLowerCase();
    return (
      type.name.toLowerCase().includes(query) ||
      type.cpp.toLowerCase().includes(query) ||
      (type.python || '').toLowerCase().includes(query) ||
      (type.javascript || '').toLowerCase().includes(query) ||
      type.golang.toLowerCase().includes(query) ||
      type.java.toLowerCase().includes(query)
    );
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-6xl mx-4 shadow-xl">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">
              Select Variable Type
            </h2>
            <button
              onClick={() => setTypeModal(false)}
              className="text-foreground hover:text-red-500 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search types..."
              className="w-full bg-background px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-4 top-3.5 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto max-h-[60vh]">
                <table className="w-full table-auto">
                  <thead className="bg-muted sticky top-0">
                    <tr className="text-left text-sm font-semibold text-foreground">
                      <th className="px-6 py-4 min-w-[160px]">Name</th>
                      <th className="px-6 py-4 min-w-[200px]">C++</th>
                      <th className="px-6 py-4 min-w-[200px]">Python</th>
                      <th className="px-6 py-4 min-w-[200px]">JavaScript</th>
                      <th className="px-6 py-4 min-w-[200px]">Go</th>
                      <th className="px-6 py-4 min-w-[200px]">Java</th>
                      <th className="px-6 py-4 w-32">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredTypes.map((type, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-muted/50 transition-colors group"
                      >
                        <td className="px-6 py-4 font-medium">{type.name}</td>
                        <td className="px-6 py-4 font-mono text-sm">{type.cpp}</td>
                        <td className="px-6 py-4 font-mono text-sm">{type.python || '-'}</td>
                        <td className="px-6 py-4 font-mono text-sm">{type.javascript || '-'}</td>
                        <td className="px-6 py-4 font-mono text-sm">{type.golang}</td>
                        <td className="px-6 py-4 font-mono text-sm">{type.java}</td>
                        <td className="px-6 py-4">
                          <button
                            className="w-full px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
                            onClick={() => {
                              onTypeSelect(type);
                              setTypeModal(false);
                            }}
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredTypes.length === 0 && (
                  <div className="p-6 text-center text-muted-foreground">
                    No types found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// Main Section
export function TestcaseInputSection({
  tsc,
  setTsc,
  testcases,
  setTestcases,
  outputType,
  setOutputType,
}) {
  const [typeModal, setTypeModal] = useState(false);
  const [typeModalIndex, setTypeModalIndex] = useState(null);

  // NEW: state for output type modal
  const [outputTypeModal, setOutputTypeModal] = useState(false);

  const addKeyValuePair = () => {
    setTsc((prev) => ({
      ...prev,
      inputs: [...prev.inputs, { key: "", type: "", value: "" }],
    }));
  };

  const handleInputChange = (index, field, value) => {
    const newInputs = [...tsc.inputs];
    newInputs[index][field] = value;
    setTsc((prev) => ({
      ...prev,
      inputs: newInputs,
    }));
  };

  const removeKeyValuePair = (index) => {
    if (tsc.inputs.length > 1) {
      const newInputs = tsc.inputs.filter((_, i) => i !== index);
      setTsc((prev) => ({
        ...prev,
        inputs: newInputs,
      }));
    }
  };

  const addTestcase = () => {
    const isValid =
      tsc.inputs.every(
        (input) =>
          input.key.trim() !== "" &&
          input.value.trim() !== "" &&
          input.type.trim() !== ""
      ) && tsc.output.trim() !== "";

    if (!isValid) return;

    const inputObj = {};
    tsc.inputs.forEach((input) => {
      inputObj[input.key.trim()] = {
        type: input.type.trim(),
        value: input.value.trim(),
      };
    });

    const newTestcase = {
      input: inputObj,
      output: tsc.output,
      explanation: tsc.explanation.trim() || undefined,
    };

    setTestcases([...testcases, newTestcase]);

    // Reset the form
    setTsc({
      inputs: [{ key: "", type: "", value: "" }],
      output: "",
      explanation: "",
    });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Testcases</h1>

      {/* Output Type Box with Modal */}
      <div className="w-full my-2 flex flex-col gap-2">
        <h1 className="text-lg font-semibold">Output Type</h1>
        <input
          type="text"
          placeholder="Output Type (e.g., int, vector<int>)"
          className="w-full px-4 py-2 bg-background rounded-lg text-foreground outline-none cursor-pointer"
          value={outputType}
          readOnly
          onClick={() => setOutputTypeModal(true)}
        />
      </div>

      <div className="w-full my-2 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Input</h1>
          <button
            onClick={addKeyValuePair}
            className="px-4 py-1 rounded-lg bg-background text-sm font-semibold"
          >
            + Add Variable
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {tsc.inputs.map((input, index) => (
            <KeyValueInput
              key={index}
              keyName={input.key}
              type={input.type}
              value={input.value}
              onChange={(field, value) =>
                handleInputChange(index, field, value)
              }
              onRemove={() => removeKeyValuePair(index)}
              openTypeModal={() => {
                setTypeModal(true);
                setTypeModalIndex(index);
              }}
            />
          ))}
        </div>
      </div>

      <div className="w-full my-2 flex flex-col gap-2">
        <h1 className="text-lg font-semibold">Output</h1>
        <input
          type="text"
          placeholder="Enter Output..."
          className="px-6 py-3 bg-background rounded-lg text-foreground outline-none"
          value={tsc.output}
          onChange={(e) =>
            setTsc((prev) => ({ ...prev, output: e.target.value }))
          }
        />
      </div>

      <div className="w-full my-2 flex flex-col gap-2">
        <h1 className="text-lg font-semibold">Explanation (Optional)</h1>
        <input
          type="text"
          placeholder="Enter Explanation..."
          className="w-full px-6 py-3 bg-background rounded-lg text-foreground outline-none"
          value={tsc.explanation}
          onChange={(e) =>
            setTsc((prev) => ({ ...prev, explanation: e.target.value }))
          }
        />
      </div>

      <button
        onClick={addTestcase}
        className="h-full self-end px-6 py-2 rounded-lg bg-background text-lg font-semibold"
      >
        Add Testcase
      </button>

      {testcases.length > 0 && (
        <div className="mt-4 p-4 bg-background rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Current Testcases:</h2>
          {testcases.map((tc, idx) => (
            <div
              key={idx}
              className="mb-3 p-3 border border-secondary rounded-lg"
            >
              <div className="font-semibold">Example {idx + 1}</div>
              <div>
                <span className="font-medium">Input: </span>
                {JSON.stringify(tc.input, null, 2)}
              </div>
              <div>
                <span className="font-medium">Output: </span>
                {tc.output}
              </div>
              {tc.explanation && (
                <div>
                  <span className="font-medium">Explanation: </span>
                  {tc.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input type modal */}
      {typeModal && (
        <TypeVariableModal
          setTypeModal={setTypeModal}
          onTypeSelect={(typeObj) => {
            const selectedType = typeObj.cpp;
            handleInputChange(typeModalIndex, "type", selectedType);
          }}
        />
      )}

      {/* Output type modal */}
      {outputTypeModal && (
        <TypeVariableModal
          setTypeModal={setOutputTypeModal}
          onTypeSelect={(typeObj) => {
            setOutputType(typeObj.cpp); // or .java or .golang as needed
          }}
        />
      )}
    </div>
  );
}
