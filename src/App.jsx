import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "@/pages/About.jsx";
import Home from "@/pages/Home.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
            </Routes>
        </Router>
    );
}

export default App;