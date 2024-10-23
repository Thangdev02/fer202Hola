import React from 'react';
import { Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const StudentsTable = ({ students, searchTerm, onSearchChange }) => {
    return (
        <div className="container mt-4">
            <h2>Students Management</h2>
            <Form className="mb-3">
                <Form.Group controlId="searchForm">
                    <Form.Control
                        type="text"
                        placeholder="Enter student name to search..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>Is Regular Student</th>
                        <th>View Grades</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.studentId}>
                            <td>{student.studentId}</td>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.street}</td>
                            <td>{student.city}</td>
                            <td>{student.isRegularStudent ? 'Fulltime' : 'Applicant'}</td>
                            <td>
                            <Link to={`/student/${student.studentId}`}>Grades</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default StudentsTable;
