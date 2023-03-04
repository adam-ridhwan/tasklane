import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Link to='/login'>
        <button>Login</button>
      </Link>
    </>
  );
};

export default Home;
