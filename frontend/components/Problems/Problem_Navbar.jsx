import { useEffect } from "react";
import { CloudUpload, Play, Rocket } from "lucide-react";

export default function Problem_Navbar() {
  return (
    <div className="w-full px-4 pt-2 flex justify-between items-center">
      {/* Icon on the left */}
      <div>
        <Rocket color="red" />
      </div>

      {/* Run and Submit buttons */}
      {/* <div className="flex gap-2 rounded-lg bg-secondary">
        <button
          className="flex px-4 py-2 text-md gap-2 items-center font-semibold"
          onClick={() => onRun({ code, language })}
        >
          <Play size={20} />
          Run
        </button>
        <div className="w-[2px] bg-primary"></div>
        <button
          className="flex px-4 py-2 text-md gap-2 items-center text-green-600 font-semibold"
          onClick={onSubmit}
        >
          <CloudUpload size={20} color="#16a34a" />
          Submit
        </button>
      </div> */}

      {/* Empty space for future content */}
      <div></div>
    </div>
  );
}
