const { default: axios } = require("axios");

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

class AdminService {
  async getAllRole() {
    try {
      const response = await axios.get(`${apiUrl}/admin/all-roles`);
      const data = response.data;

      const headers = data.length > 0
        ? Object.keys(data[0]).map((key) => ({
            key,
            label: key.toUpperCase(),
          }))
        : [];

      return { data, headers };
    } catch (error) {
      console.error("Failed to fetch roles:", error.message);
      throw error;
    }
  }

  async addNewRole(body){
    try{
      const response=await axios.post(`${apiUrl}/admin/add-role`,body);

      return response.data;
    }
    catch(error){
      console.error("Failed to fetch roles:", error.message);
      throw error;
    }
  }
}

const adminService = new AdminService();

module.exports = adminService;
