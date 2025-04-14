const { default: axios } = require("axios");

const apiUrl=process.env.NEXT_PUBLIC_BACKEND_URL;
class ProblemService{
    async getAllProblems({problem,difficulty,topics}){
        const response = await axios.get(
          `${apiUrl}/problems/all-problems`,
          {
            params: {
              problem: problem || "",
              difficulty: difficulty.length > 0 ? difficulty : "",
              topics: topics.length > 0 ? topics : "",
            },
            paramsSerializer: (params) => {
              return new URLSearchParams(params).toString();
            },
          }
        );

        return response.data;
    }

    async getAllApprovedProblems(){
        try {
            const response = await axios.get(`${apiUrl}/problems/all-approved`, {
            params: {
                problem: problem || "",
                difficulty: difficulty?.length > 0 ? difficulty : "",
                topics: topics?.length > 0 ? topics : "",
            },
            paramsSerializer: (params) => {
                return new URLSearchParams(params).toString();
            },
            });

            const responseData = response.data;

            if (responseData.length === 0) {
                return { data: [], headers: [] };
            } else {
                const extractedHeaders = Object.keys(responseData[0]).map((key) => ({
                    key,
                    label: key.toUpperCase(),
                }));

                return { data: responseData, headers: extractedHeaders };
            }
        } catch (err) {
            console.error("Failed to fetch deleted problems:", err);
            return { data: [], headers: [] };
        }
    }

    async getDeletedProblems({ problem, difficulty, topics }) {
        try {
            const response = await axios.get(`${apiUrl}/problems/all-deleted`, {
            params: {
                problem: problem || "",
                difficulty: difficulty?.length > 0 ? difficulty : "",
                topics: topics?.length > 0 ? topics : "",
            },
            paramsSerializer: (params) => {
                return new URLSearchParams(params).toString();
            },
            });

            const responseData = response.data;

            if (responseData.length === 0) {
            return { data: [], headers: [] };
            } else {
            const extractedHeaders = Object.keys(responseData[0]).map((key) => ({
                key,
                label: key.toUpperCase(),
            }));

            return { data: responseData, headers: extractedHeaders };
            }
        } catch (err) {
            console.error("Failed to fetch deleted problems:", err);
            return { data: [], headers: [] };
        }
    }

}

const problemService=new ProblemService();

module.exports=problemService;