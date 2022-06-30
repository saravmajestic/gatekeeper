import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div className="App">
      <header className="App-header">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </header>
      <main>
      <Outlet />
      </main>
    </div>
    );
}

export default AppLayout