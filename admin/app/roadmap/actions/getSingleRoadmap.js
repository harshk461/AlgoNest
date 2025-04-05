import axios from "axios";

const getSingleRoadmaps=async(id)=>{
    try{
        const res=await axios.get(`http://localhost:3090/roadmaps/get-roadmaps?id=${id}`);

        return {
            data:res.data || [],
            headers: res.data.length > 0
                ? Object.keys(res.data[0]).map(key => ({
                    key,
                    label: key.toUpperCase()
                }))
                : []
        };
    }
    catch(err){
         console.log(err.response);
    }
}

export {getSingleRoadmaps};