import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import StudentGrades from './pages/studenGrades';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/student" element={<HomePage />} />
                <Route path="/student/:studentId" element={<StudentGrades />} />
            </Routes>
        </Router>
    );
}

export default App;
