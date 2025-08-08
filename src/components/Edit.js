import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Edit = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [title,setTitle] = useState('');
  const [content,setContent] = useState('');

  const handleUpdate = async (e)=>{
    e.preventDefault();
    const { error } = await supabase
      .from("pb_posts")
      .update({
        title: title,
        content: content,
      })
      .eq("id", id);
      
      if( !error ){
        navigate(`/post/${id}`);
      }
  }
  const fetchPosts = async ()=>{
    const { data } = await supabase
      .from("pb_posts")
      .select("*")
      .eq("id", id)
      .single();
    setTitle(data.title);
    setContent(data.content);
  }
  useEffect(()=>{
    fetchPosts();
  },[id]);

  return (
    <div id="post-edit">
      <h2>게시글수정</h2>
      <form onSubmit={handleUpdate}>
        <input 
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
          required          
        />
        <br/>
        <textarea 
          value={content}
          onChange={(e)=>{setContent(e.target.value)}}
          required
        />
        <br/>
        <button type="submit">수정완료</button>
      </form>
    </div>
  );
};

export default Edit;