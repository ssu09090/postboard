import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
const Test = () => {
  const [posts,setPosts] = useState([]);
  const fetchPosts = async ()=>{
    const {data,error} = await supabase
      .from('posts')
      .select('id,title,content,users(nickname)');
    setPosts(data);
  }
  useEffect(()=>{
    fetchPosts();
  },[]);
  const handleClick = async (id)=>{
    const {error} = await supabase
      .from('posts')
      .delete()
      .eq('id',id);
    if(error) alert(error);
  }
  return (
    <div>
      {
        posts.map((item)=>{
          return (
            <div key={item.id}>
              <p onClick={()=>{handleClick(item.id)}}>{item.title}</p>
              <p>{item.content}</p>
              <p>{item.users.nickname}</p>
            </div>
          );
        })
      }
    </div>
  );
};

export default Test;