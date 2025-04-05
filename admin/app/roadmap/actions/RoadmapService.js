const { default: axios } = require("axios");

class RoadmapService {
  baseUrl = "http://localhost:3090/roadmaps";

  async fetchData(endpoint, includeHeaders = true) {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`);
      const data = response.data || [];

      const headers = includeHeaders && data.length > 0
        ? Object.keys(data[0]).map(key => ({
            key,
            label: key.toUpperCase()
          }))
        : [];

      return { data, headers };
    } catch (err) {
      console.error(`Error fetching from ${endpoint}:`, err.response?.data || err.message);
      return { data: [], headers: [] };
    }
  }

  async getAllResources() {
    return this.fetchData("all-resources");
  }

  async getAllRoadmaps() {
    return this.fetchData("all-roadmaps");
  }

  async getAllTopics() {
    return this.fetchData("all-topics");
  }

  async getSingleResource(id) {
    return this.fetchData(`get-resource?id=${id}`, false);
  }

  async getSingleRoadmap(id) {
    return this.fetchData(`get-roadmap?id=${id}`);
  }

  async handleViewSingleRoadmap(id){
    window.location.href=`/all-roadmaps/${id}`
  }
}

const roadmapService = new RoadmapService();
module.exports = roadmapService;
