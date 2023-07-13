import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState(null);

  const fetchTodos = async () => {
    // await가 없으면 응답을 받기전에 콘솔로그레 response가 찍혀서 pending 으로 뜸.
    // 그래서 await 넣어준겨(async안에서 쓰면 response를 할당받을 때까지 기다렸다가 밑에 줄이 실행됨.)
    const { data } = await axios.get("http://localhost:4000/todos");
    console.log("data", data);
    setTodos(data);
  };

  useEffect(() => {
    // 최초로 마운트 될 때, db로부터 값을 가져올 것이다.
    fetchTodos();
  }, []);

  return (
    <div>
      {todos?.map((item) => {
        return ( 
          // 맵 함수 돌아갈 땐, 항상 최상위 태그에 key라는 프로퍼티가 필요함. 
          // 몇번 째 요소인지 알려주기 위해서!
          <div key={item.id}>
            {item.id} : {item.title}
          </div>
        );
      })}
    </div>
  );
}

export default App;
