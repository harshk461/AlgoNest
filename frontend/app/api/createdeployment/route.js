import Subhosting from "subhosting";

const subhosting = new Subhosting({
  bearerToken: process.env.NEXT_PUBLIC_DENO_DEPLOY_ACCESS_TOKEN,
});

export async function POST(req) {
  const data = await req.json();
  const code = data["code"];
  const entry = data["entry"];
  const projectId = data["project"];

  const res = await subhosting.projects.deployments.create(projectId, {
    entryPointUrl: "main.py",
    assets: {
      "main.py": {
        kind: "file",
        content: code,
        encoding: "utf-8",
      },
    },
    envVars: {},
  });
  return Response.json(res);
}
