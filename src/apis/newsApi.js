import axios from "axios";

const options = {
    baseURL: 'http://newsapi.org/v2/',
    params: {
        sortBy:'publishedAt',
        apiKey:'2d6c071aed70463a9f31bcf66b240a70'
    }
};

export default axios.create(options);