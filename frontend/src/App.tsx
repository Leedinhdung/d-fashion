import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { adminRoutes, clientRoutes } from "./constants/routesContant";
import ClientLayout from "./components/clients/layout/ClientLayout";
import DashboardLayout from "./components/admin/layout/DashBoardLayout";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes cho Client */}
          {clientRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ClientLayout>
                  <route.element />
                </ClientLayout>
              }
            />
          ))}
          {adminRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <DashboardLayout>
                  <route.element />
                </DashboardLayout>
              }
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;