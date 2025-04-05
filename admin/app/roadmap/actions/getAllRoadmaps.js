import axios from "axios";

const getAllRoadmaps=async()=>{
    try{
        const res=await axios.get("http://localhost:3090/roadmaps/all-roadmaps");

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

export {getAllRoadmaps};