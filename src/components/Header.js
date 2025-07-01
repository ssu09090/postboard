import { Link, useNavigate } from "react-router-dom";

const Header = ({user,onLogin}) => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    onLogin(null);
    navigate('/');
  }
  return (
    <header>
      <nav>
        <Link to="/">게시판</Link>
        {
          user && (
            <div>              
              <span>{user.nickname}</span>
              님
              <button onClick={handleClick}>로그아웃</button>
            </div>
          )
        }
      </nav>
    </header>
  );
};

export default Header;