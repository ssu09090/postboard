import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState([]);
  const [newText, setNewText] = useState("");
  const USER = JSON.parse(localStorage.getItem("users"));
  const fetchPosts = async () => {
    const { data } = await supabase
      .from("Lecture3_posts")
      .select("id,title,content,create_at,Lecture3_users(nickname)")
      .eq("id", id)
      .single();
    setPost(data);
  };
  const fetchComments = async () => {
    const { data } = await supabase
      .from("Lecture3_comments")
      .select("id,content,Lecture3_users(nickname)")
      .eq("post_id", id);
    setComment(data);
  };
  const handleClick = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await supabase.from("Lecture3_posts").delete().eq("id", id);
      navigate("/");
    }
  };
  const handleUpdate = () => {
    navigate(`/edit/${id}`);
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await supabase.from("Lecture3_comments").insert({
      post_id: id,
      user_id: USER.id,
      content: newText,
    });
    setNewText("");
    fetchComments();
  };
  useEffect(() => {
    fetchPosts();
    fetchComments();
  }, [id]);

  const isAuthor =
    post && USER ? post.Lecture3_users.nickname === USER.nickname : false;
  return (
    <div id="post-detail">
      {post && (
        <>
          <p>작성자 : {post.Lecture3_users.nickname}</p>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {isAuthor && (
            <div className="detail-btn">
              <button onClick={handleClick}>삭제</button>
              <button onClick={handleUpdate}>수정</button>
            </div>
          )}
        </>
      )}

      <ul>
        {comment &&
          comment.map((item) => {
            // console.log( item );
            return (
              <li key={item.id}>
                {item.Lecture3_users.nickname} : {item.content}
              </li>
            );
          })}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newText}
          onChange={(e) => {
            setNewText(e.target.value);
          }}
          required
        ></textarea>
        <button type="submit">댓글작성</button>
      </form>
    </div>
  );
};

export default PostDetail;
