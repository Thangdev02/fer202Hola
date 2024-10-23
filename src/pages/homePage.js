import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SubjectsSidebar from '../components/subjectSidebar';
import StudentsTable from '../components/studentTable';

const HomePage = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const location = useLocation();

    const getSubjectFromUrl = () => {
        const params = new URLSearchParams(location.search);
        return params.get('subject');
    };

    useEffect(() => {
        // Fetch all students initially
        axios.get('http://localhost:9999/students')
            .then(response => {
                setStudents(response.data);
                setFilteredStudents(response.data); // Initially, no filter
            })
            .catch(error => {
                console.error("There was an error fetching the students!", error);
            });
    }, []);

    useEffect(() => {
        const subjectId = getSubjectFromUrl();
        let filtered = students;

        if (subjectId) {
            // Filter by subject
            filtered = students.filter(student => student.subjects.includes(subjectId));
        }

        // Further filter by search term
        if (searchTerm) {
            filtered = filtered.filter(student =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredStudents(filtered);
    }, [location.search, students, searchTerm]);

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={3}>
                    <SubjectsSidebar />
                </Col>
                <Col xs={9}>
                    <StudentsTable
                        students={filteredStudents}
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;