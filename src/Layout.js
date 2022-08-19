import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <Link to="/poem">Poem Generator</Link> || <a href ='/eliza.html'>Eliza</a> 
      </nav>
      <Outlet />
    </>
  )
};

export default Layout;