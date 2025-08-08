import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const navigate = useNavigate();
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');
  const USER = JSON.parse(localStorage.getItem('users'));

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const { error } = await supabase.from("pb_posts").insert({
      user_id: USER.id,
      title: title,
      content: content,
    });
    if( !error ){
      navigate('/');
    }
  };

  return (
    <div id="post-write">
      <h2>새글작성</h2>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="제목입력"
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
          required
        />
        <br />
        <textarea 
          placeholder="상세내용입력" 
          value={content}
          onChange={(e)=>{setContent(e.target.value)}}
          required
        />
        <br />
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default Write;