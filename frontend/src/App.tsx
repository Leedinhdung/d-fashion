import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { adminRoutes, clientRoutes } from "./constants/routesContant";
import ClientLayout from "./components/clients/layout/ClientLayout";
import DashboardLayout from "./components/admin/layout/DashBoardLayout";
import { AuthProvider } from "./contexts/admin/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
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

            {/* Routes cho Admin */}
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
      </AuthProvider>
    </Router>
  );
}

export default App;