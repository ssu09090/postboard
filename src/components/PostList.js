import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const PostList = () => {
  const POSTS_PAGE = 10;
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [current, setCurrenet] = useState(1);

  const fetchPosts = async () => {
    //supabase에서 데이터 가져오기 (일단 화면에 처음 한번만 읽어오게)
    // const { data, error } = await supabase
    //   .from("pb_posts")
    //   .select("id,title,users(nickname)");
    // if (!error) {
    //   setPosts(data);
    // }

    //페이지 별로 데이터 가져오기 .range (시작번호, 끝번호) page:1 = 0~9, page:2 = 10~13
    const from = (current - 1) * POSTS_PAGE;
    const to = from + POSTS_PAGE - 1;

    const { data, error } = await supabase
      .from("pb_posts")
      .select("id,title,pb_users(nickname)")
      .order("id", { ascending: false }) //gpt가 알려준 역순방법 (최신글순서)
      .range(from, to);
    if (!error) {
      setPosts(data);
    }
  };

  const fetPostCount = async () => {
    const { count } = await supabase
      .from("pb_posts")
      .select("id", { count: "exact", head: true });
    setTotal(count);
    // const {count} = await supabase.from("pb_posts").select('*');
    // console.log(count); -> 현재 값을 아예 못읽어 오는 중 ㅠ (0808)
    setPage(Math.ceil(count / POSTS_PAGE));
  };

  useEffect(() => {
    // console.log("처음실행");
    fetPostCount();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [current]);

  return (
    <div id="postlist">
      <div className="list-head">
        {" "}
        <h2>게시글 목록</h2>
        <Link to="/write">새글작성</Link>
      </div>
      <ul>
        {posts &&
          posts.map((item) => {
            // console.log(item);
            return (
              <li key={item.id}>
                <Link to={`/post/${item.id}`}>{item.title}</Link>
                <p>{item.pb_users.nickname}</p>
              </li>
            );
          })}
      </ul>
      {/* 페이지 설정 */}
      <div className="page-btn">
        {Array(page)
          .fill(null)
          .map((item, idx) => {
            const pageNumber = idx + 1; //idx는 0인데 페이지 번호는 1부터 시작이라 +1 해줌
            return (
              <button
                key={idx}
                onClick={() => {
                  setCurrenet(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default PostList;
