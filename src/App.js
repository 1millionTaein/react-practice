import "./App.css";
import { Switch, Route, Link, useParams, useHistory } from "react-router-dom";
import { getUser } from "./redux/UserInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login, logout } from "./redux/UserInfoSlice";

const RouteHome = () => {
  return <h2>Route홈</h2>;
};

const Home = () => {
  return <h2>Home</h2>;
};

const SwitchButton = () => {
  let params = useParams();
  let history = useHistory();
  return (
    <div>
      <h3>{params.id}</h3>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

const SwitchHome = () => {
  return (
    <div>
      <h2>Switch홈</h2>
      <ul>
        <Link to="/switch/1">1번 스위치</Link>
        <Link to="/switch/2">2번 스위치</Link>
        <Link to="/switch/3">3번 스위치</Link>
      </ul>
      <Route path="/switch/:id">
        <SwitchButton />
      </Route>
    </div>
  );
};

function App() {
  let { user } = useSelector(getUser);
  const dispatch = useDispatch();
  const [inputName, setInputName] = useState({
    username: "",
    nickname: "",
    password: "",
  });
  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
    setInputName({ ...inputName, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, nickname } = inputName;
    const user = { username, nickname };
    dispatch(
      login({
        user,
      })
    );
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="App">
      <h1>React Router Practice</h1>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/route">Route</Link>
        <Link to="/switch">Switch</Link>
      </ul>
      <form onSubmit={onSubmit}>
        <input name="username" onChange={onChange} type="text" />
        <input name="nickname" onChange={onChange} type="text" />
        <input name="password" onChange={onChange} type="password" />
        <button type="submit">제출</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
        >
          로그아웃
        </button>
      </form>
      {user ? <h3>{user?.username}</h3> : null}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/route">
          <RouteHome />
        </Route>
        <Route path="/switch">
          <SwitchHome />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
