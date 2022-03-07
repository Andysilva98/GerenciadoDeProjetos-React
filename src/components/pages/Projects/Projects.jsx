import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import LinkButton from '../../layout/LinkButton/LinkButton'
import Container from '../../layout/Container/Container'
import Message from "../../layout/Message/Message";
import ProjectCard from '../../layout/ProjectCard/ProjectCard'

import styles from './Projects.module.css'


export default function Projects() {

    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ''

    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        
        fetch('http://localhost:4000/projects', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
            .then(resp => resp.json())
            .then(data => {setProjects(data) })
            .catch((err) => console.log(err))

    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projects</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            <Message type="success" msg={message} />
            
            <Container customClass="start">
                {projects.length > 0 &&
                    
                    projects.map(project => (
                        < ProjectCard
                            id={project.id} 
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name} 
                            key={project.id}
                        />
                    ))             
                    
                }
            </Container>
        </div>
    )
}