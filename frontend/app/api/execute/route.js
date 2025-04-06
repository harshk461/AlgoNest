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

    // ✅ Ensure 'temp' is a directory and not a file
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
        await fs.mkdir(tempDir, { recursive: true }); // Create if not exists
      } else {
        throw err;
      }
    }

    // ✅ Define proper file paths
    const fileName = language === "cpp" ? "main.cpp" : "script.py";
    const filePath = path.join(tempDir, fileName);

    // ✅ Ensure we are writing to a file, not a directory
    await fs.writeFile(filePath, code, "utf-8");

    // 🐳 Docker command setup
    const cmd =
      language === "cpp"
        ? ["bash", "-c", "g++ /app/main.cpp -o /app/main && /app/main"]
        : ["python3", "/app/script.py"];

    // 🐳 Create and start Docker container
    const container = await docker.createContainer({
      Image: "code-runner", // Ensure this Docker image exists
      Cmd: cmd,
      Volumes: { "/app": {} },
      HostConfig: {
        Binds: [`${tempDir}:/app`], // Bind entire temp directory
      },
      Tty: false,
    });

    await container.start();

    // 🔥 Capture execution logs
    const outputStream = await container.logs({
      stdout: true,
      stderr: true,
      follow: true,
    });

    let output = "";
    for await (const chunk of outputStream) {
      output += chunk.toString();
    }

    output = output.replace(/[\x00-\x1F\x7F]/g, ""); // Clean non-printable chars

    // ✅ Wait for execution and cleanup
    await container.wait();
    await container.remove();
    await fs.unlink(filePath); // ✅ Ensure we remove only the file, not directory

    return NextResponse.json({ output }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error.message);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
