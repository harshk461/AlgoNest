import React from "react";

// Modified KeyValueInput component with Type
function KeyValueInput({ keyName, type, value, onChange, onRemove }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Key"
        className="px-4 py-2 bg-background rounded-lg text-foreground outline-none w-1/4"
        value={keyName}
        onChange={(e) => onChange("key", e.target.value)}
      />
      <input
        type="text"
        placeholder="Type (e.g., vector<int>)"
        className="px-4 py-2 bg-background rounded-lg text-foreground outline-none w-1/4"
        value={type}
        onChange={(e) => onChange("type", e.target.value)}
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

// Updated TestcaseInputSection with type support
export function TestcaseInputSection({ tsc, setTsc, testcases, setTestcases }) {
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
    const isValid = tsc.inputs.every(
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
    </div>
  );
}
