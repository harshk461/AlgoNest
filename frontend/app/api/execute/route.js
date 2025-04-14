import Docker from "dockerode";
import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const docker = new Docker();

export async function POST(req) {
  try {
    const body = await req.json();
    const { language, code } = body;

    if (!language || !code) {
      return NextResponse.json(
        { error: "Language and code are required" },
        { status: 400 }
      );
    }

    const tempDir = path.join(process.cwd(), "temp");
    try {
      const stat = await fs.stat(tempDir);
      if (!stat.isDirectory()) {
        return NextResponse.json(
          { error: "temp exists but is not a directory" },
          { status: 500 }
        );
      }
    } catch (err) {
      if (err.code === "ENOENT") {
        await fs.mkdir(tempDir, { recursive: true });
      } else {
        throw err;
      }
    }

    let fileName;
    if (language === "cpp") fileName = "main.cpp";
    else if (language === "python") fileName = "script.py";
    else if (language === "java") fileName = "Main.java";
    else return NextResponse.json({ error: "Unsupported language" }, { status: 400 });

    const filePath = path.join(tempDir, fileName);
    await fs.writeFile(filePath, code, "utf-8");

    const container = await docker.createContainer({
      Image: "code-runner",
      Cmd: ["/app/run.sh"],
      Env: [`LANGUAGE=${language}`],
      Volumes: { "/app": {} },
      HostConfig: {
        Binds: [`${tempDir}:/app`],
      },
      Tty: false,
    });

    await container.start();

    const outputStream = await container.logs({
      stdout: true,
      stderr: true,
      follow: true,
    });

    let output = "";
    for await (const chunk of outputStream) {
      output += chunk.toString();
    }

    output = output.replace(/[\x00-\x1F\x7F]/g, ""); // Sanitize

    await container.wait();
    await container.remove();
    await fs.unlink(filePath);

    return NextResponse.json({ output }, { status: 200 });
  } catch (error) {
    console.error("Execution error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
