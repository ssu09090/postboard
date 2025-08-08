import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Test = () => {
  const [posts,setPosts] = useState([]);
  
  const fetchPosts = async ()=>{
    const { data, error } = await supabase
      .from("pb_posts")
      .select("id,title,content,pb_users(nickname)");
    setPosts(data);
  }
  useEffect(()=>{
    fetchPosts();
  },[]);
  
  const handleClick = async (id)=>{
    const { error } = await supabase
      .from("pb_posts")
      .delete()
      .eq("id", id);
    if(error) alert(error);
  }
  return (
    <div>
      {
        posts.map((item)=>{
          return (
            <div key={item.id}>
              <p
                onClick={() => {
                  handleClick(item.id);
                }}
              >
                {item.title}
              </p>
              <p>{item.content}</p>
              <p>{item.pb_users.nickname}</p>
            </div>
          );
        })
      }
    </div>
  );
};

export default Test;