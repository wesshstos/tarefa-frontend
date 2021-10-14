import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import api from '../../services/api';
import moment from 'moment'

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    create_at: Date;
    update_at: Date;
}

const Tasks: React.FC = () => {

    const [tasks, setTasks] = useState<ITask[]>([])
    const history = useHistory()

    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {
        const response = await api.get('/tasks')
        console.log(response);
        setTasks(response.data)
    }

    function formatDate(date: Date) {
        return moment(date).format('DD/MM/YYYY')
    }

    function newTask() {
        history.push('/tarefas_cadastro')
    }

    return (
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Tarefas</h1>
                <Button variant="dark" size="sm" onClick={newTask}>Nova Tarefa</Button>
            </div>
            <br />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Data de Atualização</th>
                        <th>Status</th>
                        <th>Ações(Botões)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{formatDate(task.update_at)}</td>
                                <td>{task.finished ? "Finalizado" : "Pendente"}</td>
                                <td>
                                    <Button size="sm" variant="primary">Editar</Button>{' '}
                                    <Button size="sm" variant="success">Finalizar</Button>{' '}
                                    <Button size="sm" variant="warning">Visualizar</Button>{' '}
                                    <Button size="sm" variant="danger">Remover</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Tasks;
