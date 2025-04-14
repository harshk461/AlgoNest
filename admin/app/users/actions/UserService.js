const { default: axios } = require("axios");

const apiUrl=process.env.NEXT_PUBLIC_BACKEND_URL;
class UserService{
    async getAllClientUser(){
        try{
            const response=await axios.get(`${apiUrl}/users/all-client-users`);

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
        }
        catch(err){
            throw err;
        }
    }

     async getAllDeletedClientUser(){
        try{
            const response=await axios.get(`${apiUrl}/users/all-deleted-client-users`);

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
        }
        catch(err){
            throw err;
        }
    }
}

const userService=new UserService();
module.exports=userService;