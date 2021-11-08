import Link from 'next/link'

import { FaTrash } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';

import { useState } from 'react';
import { addFruit, addFruitsToFirestore, deleteFruit, editFruit } from '../store/fruits';

import { useSelector, useDispatch } from 'react-redux'


const CrudFruits = () => {
    // const db = firebase.firestore()
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
        // const a = await db.collection('fruits').add({ emoji: newFruitEmoji, name: newFruitName })
        const newFruit = { emoji: newFruitEmoji, name: newFruitName }
        dispatch(addFruitsToFirestore(newFruit))
        setNewFruitEmoji('')
        setNewFruitName('')
    }

    const deleteFruitOfList = (fruitId) => {
        // await db.collection('fruits').doc(fruitId).delete()
        dispatch(deleteFruit({ id: fruitId }))
    }

    const showEditFruit = ({ id, name, emoji }) => {
        setHideUpdateForm(false)
        setEditFruitId(id)
        setEditFruitEmoji(emoji)
        setEditFruitName(name)
    }

    const editFruitOfTheList = async (e) => {
        e.preventDefault()
        // await db.collection('fruits').doc(editFruitId).set({ name: editFruitName, emoji: editFruitEmoji })
        dispatch(editFruit({ name: editFruitName, emoji: editFruitEmoji, id: editFruitId }))
    }

    // const [fruits, fruitsLoading, error] = useCollection(firebase.firestore().collection('fruits'), {})

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Fruit Name</th>
                        <th>Fruit Emoji</th>
                        <th>crud operations</th>
                    </tr>
                </thead>
                <tbody>
                    {fruits?.map(fruit =>
                    (
                        <tr key={fruit.id}>
                            <th>{fruit.name}</th>
                            <th>{fruit.emoji}</th>
                            <th>
                                <button key={`delete-${fruit.id}`} onClick={() => deleteFruitOfList(fruit.id)}>
                                    <FaTrash style={{ color: '#C70000' }} /></button>
                                <button key={`update-${fruit.id}`} onClick={() => showEditFruit({
                                    id: fruit.id, name: fruit.name, emoji: fruit.emoji
                                })}>
                                    <FaPen style={{ color: '#6e8c91' }} /></button>
                            </th>
                        </tr>
                    )
                    )}
                </tbody>
            </table>

            <form onSubmit={addNewFruit}>
                <label htmlFor="newFruitName"> Fruit Name</label>
                <input
                    type="text"
                    name="newFruitName" id="newFruitName" onChange={(e) => setNewFruitName(e.target.value)}
                    value={newFruitName} />
                <label htmlFor="newFruitEmoji">Fruit Emoji</label>
                <input
                    type="text"
                    name="newFruitEmoji"
                    id="newFruitEmoji" onChange={(e) => setNewFruitEmoji(e.target.value)}
                    value={newFruitEmoji} />
                <input type="submit" value="Save Fruit" />
            </form>

            <form onSubmit={editFruitOfTheList} hidden={hideUpdateForm}>
                <label htmlFor="newFruitName"> Fruit Name</label>
                <input
                    type="text"
                    name="editFruitName" id="editFruitName" onChange={(e) => setEditFruitName(e.target.value)}
                    value={editFruitName} />
                <label htmlFor="newFruitEmoji">Fruit Emoji</label>
                <input
                    type="text"
                    name="newFruitEmoji"
                    id="newFruitEmoji" onChange={(e) => setEditFruitEmoji(e.target.value)}
                    value={editFruitEmoji} />
                <input type="submit" value="Edit Fruit" />
                <button onClick={(e) => { e.preventDefault(); setHideUpdateForm(true) }}>Cancel</button>
            </form>
            <Link href="/">
                <a >&#60;- Back to home</a>
            </Link>
        </div>
    )
}

export default CrudFruits
