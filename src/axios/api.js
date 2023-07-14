import axios from "axios";

// 원래 가공하지 않은 axios를 썼었다. 새로운 인스턴스를 만들어서 활용.
// 이 인스턴스를 호출할때는 기본적으로 무슨 url을 달고 호출할 것이냐 = baseURL
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 1
  // 언제까지 기다릴지, 그 시간을 넘어가면 오류를 낸다. 단위는 ms(1000=1초)
});

// 요청과 응답 사이에 관여,
// request와 response사이에 어떤 로직들을 넣겠다!

// 요청
instance.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수.(인자로 config를 받음.)
  function (config) {
    console.log("인터셉터 요청 성공");
    return config;
  },
  // 오류 요청을 보내기 전 수행되는 함수.
  function (error) {
    console.log("인터셉터 요청 오류!");
    return Promise.reject(error);
  }
);

// response
instance.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수.
  function (response) {
    console.log("인터셉터 응답 받았습니다.");
    return response;
  },

  // 오류 응답을 보내기 전 수행되는 함수.
  function (error) {
    console.log("인터셉터 오류 발생!");
    return Promise.reject(error);
  }
);

export default instance;

// 인터셉터가 중간에서 HTTP 요청을 가로채서 작업함.