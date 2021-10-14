import React, { useState, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import './index.css';
import { useHistory } from 'react-router-dom';

interface ITask {
    title: string;
    description: string;
}

const Tasks: React.FC = () => {

    const history = useHistory()

    const [model, setModel] = useState<ITask>({
        title: '',
        description: ''
    })

    function updateModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        const response = await api.post('/tasks', model)

        console.log(response)
    }

    function back(){
        history.goBack()
    }

    return (

        <div className="container">
            <br />
            <div className="task-header">
                <h1>Nova Tarefa</h1>
                <Button variant="dark" size="sm" onClick={back}>Voltar</Button>
            </div>
            <br />
            <div className="Container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    );
}
export default Tasks;