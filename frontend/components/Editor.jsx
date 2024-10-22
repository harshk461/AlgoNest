"use client";

import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";

const languages = [
  { name: "JavaScript", entryPoint: "main.js" },
  { name: "TypeScript", entryPoint: "main.ts" },
  { name: "python", entryPoint: "main.py" },
  { name: "Java", entryPoint: "Main.java" },
  { name: "C++", entryPoint: "main.cpp" },
  { name: "Ruby", entryPoint: "main.rb" },
  { name: "Go", entryPoint: "main.go" },
  { name: "PHP", entryPoint: "index.php" },
];

export default function IDE() {
  const [URL, setURL] = useState("");
  const [project, setProject] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  useEffect(() => {
    const createProject = async () => {
      try {
        const response = await fetch("/api/getproject", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const responseData = await response.json();
        setProject(responseData);
      } catch (error) {
        console.error("Failed to create project:", error);
      }
    };

    createProject();
  }, []);

  const project_id = project["projectId"];

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const pollDeploymentStatus = async (deploymentId) => {
    let response;
    try {
      response = await fetch("/api/getdeployment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: deploymentId }),
      });
    } catch (error) {
      console.log(error);
    }
    return await response.json();
  };

  const updateStatus = (message) => {
    if (document.querySelector(".ide-message")) {
      document.querySelector(".ide-message").textContent = message;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    updateStatus("Deploying code...");

    const codeText = event.target.querySelector(
      ".monaco-scrollable-element"
    ).textContent;
    try {
      const response = await fetch("/api/createdeployment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: codeText,
          entry: selectedLanguage.entryPoint,
          project: project_id,
        }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      let responseData = await response.json();
      while (responseData["status"] === "pending") {
        await delay(3000);
        responseData = await pollDeploymentStatus(responseData["id"]);
      }

      if (responseData["status"] === "success") {
        setURL(`http://${responseData.domains[0]}`);
        updateStatus("Successfully deployed.");
      } else {
        updateStatus("Deployment failed.");
        throw new Error("Deployment failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(true);
  };

  const handleLanguageChange = (event) => {
    const selectedLang = languages.find(
      (lang) => lang.name === event.target.value
    );
    setSelectedLanguage(selectedLang);
  };
  return (
    <div className="flex justify-center items-start pt-10 h-full">
      <div className="w-full max-w-4xl p-4 border">
        <form action="#" onSubmit={handleSubmit}>
          <div className="">
            <div className="mb-4">
              <label htmlFor="language" className="block mb-2">
                Select Language:
              </label>
              <select
                id="language"
                value={selectedLanguage.name}
                onChange={handleLanguageChange}
                className="border rounded p-2 dark:bg-black"
              >
                {languages.map((lang) => (
                  <option key={lang.name} value={lang.name}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <label htmlFor="comment" className="sr-only">
              Add your code
            </label>
            <Editor
              height="50vh"
              defaultLanguage="javascript"
              defaultValue='Deno.serve(req => new Response("Hello!"));'
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5"></div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Run
              </button>
            </div>
          </div>
        </form>
        {/* Conditional rendering for iframe or loading message */}
        <div className="mt-4">
          <p className="ide-message mb-4"></p>
          {isLoading && (
            <p className="text-center">Deployed code will run here.</p>
          )}
          <iframe
            src={URL}
            title="Deployed Project"
            width="100%"
            height="300px"
            onLoad={handleLoad}
            onError={handleError}
            style={{ display: isLoading ? "none" : "block" }} // Hide iframe while loading
          ></iframe>
        </div>
      </div>
    </div>
  );
}
