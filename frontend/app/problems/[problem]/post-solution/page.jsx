import { Plus, Send } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-[1200px] m-auto flex flex-col bg-secondary gap-4">
        <div className="w-full flex justify-between px-4 pt-4">
          <input
            class="block w-full outline-none placeholder:text-label-4 dark:placeholder:text-dark-label-4 border-none text-label-1 dark:text-dark-label-1 bg-transparent dark:bg-dark-transparent focus:bg-transparent dark:focus:bg-dark-transparent rounded-none border-r-0 p-0 text-[20px] leading-[28px] sentry-unmask"
            autocomplete="off"
            placeholder="Enter your title"
          />
          <div className="flex gap-2 items-center">
            <button className="h-auto text-md flex px-4 py-2 bg-primary rounded-lg gap-2 font-semibold">
              Cancel
            </button>
            <button className="h-auto text-md flex px-4 py-2 bg-green-500 rounded-lg gap-2 font-semibold items-center">
              <Send size={20} />
              Post
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col px-4">
          <button className="w-fit flex gap-1 items-center px-4 py-1 rounded-full text-sm bg-primary">
            <Plus />
            Tags
          </button>
        </div>

        <div className="w-full flex flex-col">
          <div className="w-full border-y-2 border-y-primary px-4 py-2">
            Editor menu
          </div>
          <div className="w-full flex">
            <div className="w-1/2 p-4">Editor </div>
            <div className="w-1/2 p-4">Editor Result</div>
          </div>
        </div>
      </div>
    </div>
  );
}
