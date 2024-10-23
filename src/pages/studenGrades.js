import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StudentGrades = () => {
    const { studentId } = useParams();
    const [grades, setGrades] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [newGrade, setNewGrade] = useState('');
    const [newExplanation, setNewExplanation] = useState('');

    useEffect(() => {
        // Fetch student grades
        axios.get(`http://localhost:9999/grades?studentId=${studentId}`)
            .then(response => {
                setGrades(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the grades!", error);
            });

        // Fetch student name using query parameter
        axios.get(`http://localhost:9999/students?studentId=${studentId}`)
            .then(response => {
                if (response.data.length > 0) {
                    setStudentName(response.data[0].name); // Use the first match
                } else {
                    console.error("Student not found!");
                }
            })
            .catch(error => {
                console.error("There was an error fetching the student details!", error);
            });
    }, [studentId]);

    const handleAddGrade = () => {
        // Prepare new grade data
        const gradeData = {
            studentId: studentId,
            grade: newGrade,
            explanation: newExplanation
        };

        // Post new grade to json-server
        axios.post('http://localhost:9999/grades', gradeData)
            .then(response => {
                setGrades([...grades, response.data]);
                setNewGrade('');
                setNewExplanation('');
            })
            .catch(error => {
                console.error("There was an error adding the grade!", error);
            });
    };

    return (
        <div className="container-fluid mt-4">
            <h3>{studentName}'s Grade Details</h3>

              <div className="mt-4">
                <h5>Add New Grade</h5>
                <div className='d-flex align-items-center justify-content-center'>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter grade"
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter explanation"
                    value={newExplanation}
                    onChange={(e) => setNewExplanation(e.target.value)}
                />
                <button className="btn btn-primary mb-2 w-25 " onClick={handleAddGrade}>
                    Add new
                </button>
                </div>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Grade</th>
                        <th>Explanation</th>
                    </tr>
                </thead>
                <tbody>
                    {grades.map((grade, index) => (
                        <tr key={index}>
                            <td>{grade.grade}</td>
                            <td>{grade.explanation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
          
            
            <a href="/" className="btn btn-secondary mt-3">Back to Home</a>
        </div>
    );
};

export default StudentGrades;
