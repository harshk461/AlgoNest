const { default: axios } = require("axios");

const getAllResources=async()=>{
    try{
        const response=await axios.get("http://localhost:3090/roadmaps/all-resources");

        return {
            data:response.data || [],
            headers: response.data.length > 0
                ? Object.keys(response.data[0]).map(key => ({
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

export {getAllResources};