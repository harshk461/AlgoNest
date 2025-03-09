import axios from "axios";

export async function updateProblem({ body, setLoading,newSlug }) {
  try {
    setLoading(true);
    await axios.patch("http://localhost:3090/problems/update-problem", body);
if(newSlug)
  window.location.replace("all-problems")
    window.location.reload();
  } catch (e) {
    console.error("Failed to update problem:", e);
  } finally {
    setLoading(false);
  }
}
