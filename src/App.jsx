import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title:'', 
  })
 // nosql, mongodb, json 등은 id는 자동으로 부여하기 때문에
 // 우리는 타이틀만 갖고 있으면 된다!(db.json파일 참조)


 // 조회 함수
  const fetchTodos = async () => {
    // await가 없으면 응답을 받기전에 콘솔로그레 response가 찍혀서 pending 으로 뜸.
    // 그래서 await 넣어준겨(async안에서 쓰면 response를 할당받을 때까지 기다렸다가 밑에 줄이 실행됨.)
    const { data } = await axios.get("http://localhost:4000/todos");
    console.log("data", data);
    setTodos(data);
  };

 // 추가 함수
  const onSubmitHandler = async () => {
    axios.post('http://localhost:4000/todos', inputValue);
    setTodos([...todos, inputValue]);
  };

 // 식제 함수
  const onDeleteButtonClickHandler = async(id)=>{
    axios.delete(`http://localhost:4000/todos/${id}`);
    setTodos(
      todos.filter(item=>{
      return item.id !== id;
    })
    );

  };
  


  useEffect(() => {
    // 최초로 마운트 될 때, db로부터 값을 가져올 것이다.
    fetchTodos();
  }, []);

  return (
    <>
      <div>
        
        {/* 인풋 영역 */}
      <form onSubmit={(e) => {
        e.preventDefault(); //form태그안의 onsubmit은 자동으로 새로고침 하므로 프리밴트 디폴트로 막아줌.
          
      // 버튼 클릭 시, input에 들어있는 값(state)를 이용하여 DB에 저장(post요청)
      onSubmitHandler();
    
    }}
          >
        <input type="text"
        value={inputValue.title}
        onChange={(e)=>{
          setInputValue({
            title : e.target.value
          });
        }}
        />
        <button>추가</button>
        
        
      </form>
      </div>

      {/* 데이터 영역 */}
      <div>
        {/* ?로 옵셔널 체이닝 */}
        {todos?.map((item) => {
          return (
            // 맵 함수 돌아갈 땐, 항상 최상위 태그에 key라는 프로퍼티가 필요함.
            // 몇번 째 요소인지 알려주기 위해서!
            <div key={item.id}>
              {item.id} : {item.title}
              {/* 한번 한수로 감싸줘야 함수 호출하고 렌더링하지 않는다. 바로 호출하지 말고 감싸주기! */}
            &nbsp;<button onClick={()=>onDeleteButtonClickHandler(item.id)}>🥹</button>
            </div>
          );
        })}
      </div>
    </>
  );
      }

export default App;
