import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = ({onLogin}) => {
  const [email,setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    //pb_users 테이블에 email 주소 정보를 조회 : select
    const { data, error } = await supabase
      .from("pb_users")
      .select("*")
      .eq("email", email.trim())
      .single();

    if (error || !data) {
      alert("존재하지 않는 이메일 입니다");
    } else {
      //로그인 정보가 있으면
      onLogin(data);
      navigate("/");
    }
  }
  
  return (
    <div id="login">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          placeholder="로그인 이메일 입력"
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;