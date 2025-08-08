import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import PostList from "./components/PostList";
import { useEffect, useState } from "react";
import PostDetail from "./components/PostDetail";
import Write from "./components/Write";
import Edit from "./components/Edit";
import "./global.scss";
import "./App.scss";

const App = () => {
  const USER_KEY='users';
  const [isLoading,setIsLoading] = useState(true);
  const [user,setUser] = useState(null);  
  const handleUser = (user)=>{
    setUser(user);
    localStorage.setItem(USER_KEY,JSON.stringify(user));       
  }
  useEffect(()=>{
    const storedUser = localStorage.getItem(USER_KEY);    
    if( storedUser ){
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  },[]);
  return (
    <BrowserRouter basename="/postboard">
      <Header user={user} onLogin={handleUser} />
      <Routes>
        <Route
          path="/"
          element={
            isLoading ? (
              <div>로딩중.....</div>
            ) : user ? (
              <PostList />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleUser} />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/write" element={<Write />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;