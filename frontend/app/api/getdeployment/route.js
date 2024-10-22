import Subhosting from "subhosting";

const subhosting = new Subhosting({
  bearerToken: process.env.NEXT_PUBLIC_DENO_DEPLOY_ACCESS_TOKEN,
});

export async function POST(req) {
  const data = await req.json();
  const deploymentId = data["id"];
  const deployment = await subhosting.deployments.get(deploymentId);
  return Response.json(deployment);
}
