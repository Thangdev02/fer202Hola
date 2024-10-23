import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SubjectsSidebar = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        // Fetch subjects data from json-server
        axios.get('http://localhost:9999/subjects')
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the subjects!", error);
            });
    }, []);

    return (
        <div className="sidebar mt-4">
            <h5>Subjects</h5>
            <ListGroup>
                {subjects.map(subject => (
                    <ListGroup.Item key={subject.id}>
                        <Link to={`/student?subject=${subject.id}`}>{subject.name}</Link>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default SubjectsSidebar;
