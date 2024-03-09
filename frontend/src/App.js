import AuthProvider from "./utilities/authProvider";
import Routes from "./routes"

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
