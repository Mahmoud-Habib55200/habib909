import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
 
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* ✅ ثابت في كل الصفحات */}
        <Navbar />

        {/* ✅ الصفحات */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         

          
          </Routes>
        </main>

        {/* ممكن تضيف Footer هنا */}
      </div>
    </Router>
  );
}

export default App;
