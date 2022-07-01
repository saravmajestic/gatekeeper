import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GateKeeper</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
