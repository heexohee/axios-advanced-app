import axios from "axios";

// 원래 가공하지 않은 axios를 썼었다. 새로운 인스턴스를 만들어서 활용.
// 이 인스턴스를 호출할때는 기본적으로 무슨 url을 달고 호출할 것이냐 = baseURL
const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
})


export default instance;