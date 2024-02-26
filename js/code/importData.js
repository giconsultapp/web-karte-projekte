const instanceAxios = axios.create({
  baseURL: "http://localhost:5001/",
});

const resultsAPI = {
  getData() {
    return instanceAxios.get("data");
  },
};

// All code is here
