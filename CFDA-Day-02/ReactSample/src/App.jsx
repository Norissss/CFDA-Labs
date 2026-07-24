import { Route, Router, Routes } from "react-router";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";

function App()
{
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/tasks" element={<TasksPage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App;