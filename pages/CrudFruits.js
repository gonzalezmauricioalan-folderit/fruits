import Link from 'next/link'

import { FaTrash } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';

import { useState } from 'react';
import { addFruitsToFirestore, deleteFruitFromFirestore, editFruitInFirestore } from '../store/fruits';

import { useSelector, useDispatch } from 'react-redux'

import Button from 'react-bootstrap/Button';
import { Table, Form, Card } from 'react-bootstrap';

const CrudFruits = () => {
    const [newFruitName, setNewFruitName] = useState('')
    const [newFruitEmoji, setNewFruitEmoji] = useState('')
    const [editFruitId, setEditFruitId] = useState('')
    const [editFruitName, setEditFruitName] = useState('')
    const [editFruitEmoji, setEditFruitEmoji] = useState('')
    const [hideUpdateForm, setHideUpdateForm] = useState(true)

    const { fruits } = useSelector(state => state.fruits)
    const dispatch = useDispatch()

    const addNewFruit = (e) => {
        e.preventDefault()
        const newFruit = { emoji: newFruitEmoji, name: newFruitName }
        dispatch(addFruitsToFirestore(newFruit))
        setNewFruitEmoji('')
        setNewFruitName('')
    }

    const deleteFruitOfList = (fruitId) => {
        dispatch(deleteFruitFromFirestore(fruitId))
    }

    const showEditFruit = ({ id, name, emoji }) => {
        setHideUpdateForm(false)
        setEditFruitId(id)
        setEditFruitEmoji(emoji)
        setEditFruitName(name)
    }

    const editFruitOfTheList = async (e) => {
        e.preventDefault()
        dispatch(editFruitInFirestore({ name: editFruitName, emoji: editFruitEmoji, id: editFruitId }))
    }

    return (
        <div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th><p className="d-flex justify-content-center">Fruit Name</p> </th>
                        <th><p className="d-flex justify-content-center">Fruit Emoji</p> </th>
                        <th><p className="d-flex justify-content-center">Crud operations</p> </th>
                    </tr>
                </thead>
                <tbody>
                    {fruits?.map(fruit =>
                    (
                        <tr key={fruit.id}>
                            <th> <p className="d-flex justify-content-center"> {fruit.name}</p> </th>
                            <th> <p className="d-flex justify-content-center"> {fruit.emoji}</p> </th>
                            <th >
                                <div className="d-flex justify-content-center p-1">
                                    <Button variant='danger' key={`delete-${fruit.id}`} onClick={() => deleteFruitOfList(fruit.id)} className="m-1">
                                        <FaTrash style={{ color: '#C70000' }} /></Button>
                                    <Button variant='success' className="m-1" key={`update-${fruit.id}`} onClick={() => showEditFruit({
                                        id: fruit.id, name: fruit.name, emoji: fruit.emoji
                                    })}>
                                        <FaPen style={{ color: '#6e8c91' }} /></Button>
                                </div>
                            </th>
                        </tr>
                    )
                    )}
                </tbody>
            </Table>

            <Card className="mb-2">
                <Card.Header> <h4>Add a new fruit</h4> </Card.Header>
                <Card.Body>
                    <Form onSubmit={addNewFruit} className="d-flex flex-row m-2">
                        <Form.Group className="m-1">
                            <Form.Label htmlFor="newFruitName"> Fruit Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="newFruitName" id="newFruitName" onChange={(e) => setNewFruitName(e.target.value)}
                                value={newFruitName} />
                        </Form.Group>
                        <Form.Group className="m-1">
                            <Form.Label htmlFor="newFruitEmoji">Fruit Emoji</Form.Label>
                            <Form.Control
                                type="text"
                                name="newFruitEmoji"
                                id="newFruitEmoji" onChange={(e) => setNewFruitEmoji(e.target.value)}
                                value={newFruitEmoji} />
                        </Form.Group>
                        <Form.Group className="m-1 d-flex align-items-end p-1">
                            <Button size="sm" type="submit" variant="primary">Save Fruit</Button>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>


            <Card hidden={hideUpdateForm} className="mt-2 mb-2">
                <Card.Header> <h4>Edit fruit</h4></Card.Header>
                <Card.Body>
                    <Form onSubmit={editFruitOfTheList} >
                        <Form.Group >
                            <Form.Label htmlFor="newFruitName"> Fruit Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="editFruitName" id="editFruitName" onChange={(e) => setEditFruitName(e.target.value)}
                                value={editFruitName} />
                        </Form.Group>
                        <Form.Group className="m-1">
                            <Form.Label htmlFor="newFruitEmoji">Fruit Emoji</Form.Label>
                            <Form.Control
                                type="text"
                                name="newFruitEmoji"
                                id="newFruitEmoji" onChange={(e) => setEditFruitEmoji(e.target.value)}
                                value={editFruitEmoji} />
                        </Form.Group>
                        <Button className="m-1" type="submit" size="sm" variant="success">Edit Fruit</Button>
                        <Button variant="secondary" size="sm" onClick={(e) => { e.preventDefault(); setHideUpdateForm(true) }}>Cancel</Button>
                    </Form>

                </Card.Body>
            </Card>

        </div >
    )
}

export default CrudFruits
