// 'use client'
const { default: axios } = require("axios");

const getSingleResources=async(id)=>{
    try{
        const response=await axios.get(`http://localhost:3090/roadmaps/get-resource?id=${id}`);

        return {
            data:response.data || [],
        };
    }
    catch(err){
        console.log(err.response);
    }
}

export {getSingleResources};