// Modified components for testcase input with key-value pairs
import React from "react";

// This component manages a single key-value pair
function KeyValueInput({ keyName, value, onChange, onRemove }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Key"
        className="px-4 py-2 bg-background rounded-lg text-foreground outline-none w-1/3"
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

// Component that accepts tsc and testcases as props
export function TestcaseInputSection({ tsc, setTsc, testcases, setTestcases }) {
  // Add a new key-value input field
  const addKeyValuePair = () => {
    setTsc((prev) => ({
      ...prev,
      inputs: [...prev.inputs, { key: "", value: "" }],
    }));
  };

  // Handle changes to input key-value pairs
  const handleInputChange = (index, field, value) => {
    const newInputs = [...tsc.inputs];
    newInputs[index][field] = value;
    setTsc((prev) => ({
      ...prev,
      inputs: newInputs,
    }));
  };

  // Remove a key-value pair
  const removeKeyValuePair = (index) => {
    if (tsc.inputs.length > 1) {
      const newInputs = tsc.inputs.filter((_, i) => i !== index);
      setTsc((prev) => ({
        ...prev,
        inputs: newInputs,
      }));
    }
  };

  // Add the current testcase to the list
  const addTestcase = () => {
    // Validate inputs
    const isValid =
      tsc.inputs.every(
        (input) => input.key.trim() !== "" && input.value.trim() !== ""
      ) && tsc.output.trim() !== "";

    if (!isValid) return;

    // Format inputs as an object
    const inputObj = {};
    tsc.inputs.forEach((input) => {
      inputObj[input.key.trim()] = input.value.trim();
    });

    const newTestcase = {
      input: inputObj,
      output: tsc.output,
      explanation: tsc.explanation.trim() || undefined,
    };

    setTestcases([...testcases, newTestcase]);

    // Reset the form
    setTsc({
      inputs: [{ key: "", value: "" }],
      output: "",
      explanation: "",
    });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-lg font-semibold">Testcases</h1>

      {/* Input section */}
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
              value={input.value}
              onChange={(field, value) =>
                handleInputChange(index, field, value)
              }
              onRemove={() => removeKeyValuePair(index)}
            />
          ))}
        </div>
      </div>

      {/* Output section */}
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

      {/* Explanation section */}
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

      {/* Add button */}
      <button
        onClick={addTestcase}
        className="h-full self-end px-6 py-2 rounded-lg bg-background text-lg font-semibold"
      >
        Add Testcase
      </button>

      {/* Display current testcases */}
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
                {JSON.stringify(tc.input)}
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
    </div>
  );
}
