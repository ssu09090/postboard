import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newText, setNewText] = useState("");
  const USER = JSON.parse(localStorage.getItem("users"));

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from("pb_posts")
      .select("id,title,content,create_at,pb_users(nickname)")
      .eq("id", id)
      .single();
    if (error) console.error("Error fetching post:", error);
    else setPost(data);
  };

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("pb_comments")
      .select(
        `
        id,
        content,
        create_at,
        author:pb_users!pb_comments_user_id_fkey(
          nickname
        )`
      )
      .eq("post_id", id)
      .order("create_at", { ascending: true });
    if (error) console.error("Error fetching comments:", error);
    else setComments(data);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const { error } = await supabase.from("pb_posts").delete().eq("id", id);
      if (error) console.error("Error deleting post:", error);
      else navigate("/");
    }
  };

  const handleEdit = () => navigate(`/edit/${id}`);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const content = newText.trim();
    if (!content) return;
    const { error } = await supabase.from("pb_comments").insert({
      post_id: id,
      user_id: USER.id,
      content,
    });
    if (error) console.error("Error adding comment:", error);
    else {
      setNewText("");
      fetchComments();
    }
  };

  const isAuthor = post?.pb_users?.nickname === USER.nickname;

  return (
    <div id="post-detail">
      {post && (
        <>
          <p>작성자: {post.pb_users.nickname}</p>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {isAuthor && (
            <div className="detail-btn">
              <button onClick={handleDelete}>삭제</button>
              <button onClick={handleEdit}>수정</button>
            </div>
          )}
        </>
      )}

      <h3>댓글</h3>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <strong>{c.author.nickname}</strong>: {c.content}
          </li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          required
        />
        <button type="submit">댓글작성</button>
      </form>
    </div>
  );
};

export default PostDetail;
