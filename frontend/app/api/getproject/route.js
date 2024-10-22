export async function GET(req) {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

  if (!projectId) {
    return new Response("Project ID not found", { status: 500 });
  }
  return Response.json({
    projectId,
  });
}
