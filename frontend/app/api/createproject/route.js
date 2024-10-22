import Subhosting from "subhosting";

const subhosting = new Subhosting({
  bearerToken: process.env.NEXT_PUBLIC_DENO_DEPLOY_ACCESS_TOKEN,
});

export async function GET() {
  const orgId = process.env.NEXT_PUBLIC_DENO_ORG_ID;
  const project = await subhosting.organizations.projects.create(orgId, {
    name: null,
  });

  return Response.json(project);
}
