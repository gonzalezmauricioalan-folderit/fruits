import Link from 'next/link'

import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from '../firebase/clientApp'

import { FaTrash } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';

import { useState } from 'react';

const CrudFruits = () => {
    const db = firebase.firestore()
    const [newFruitName, setNewFruitName] = useState('')
    const [newFruitEmoji, setNewFruitEmoji] = useState('')
    const addNewFruit = async (e) => {
        e.preventDefault()
        const a = await db.collection('fruits').add({emoji: newFruitEmoji, name: newFruitName })
        setNewFruitEmoji('')
        setNewFruitName('')
    }
    const [fruits, fruitsLoading, error] = useCollection(firebase.firestore().collection('fruits'), {})

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
                    {fruits?.docs?.map(fruit =>
                    (
                        <tr key={fruit.id}>
                            <th>{fruit.data().name}</th>
                            <th>{fruit.data().emoji}</th>
                            <th>
                                <button><FaTrash style={{ color: '#C70000' }} /></button>
                                <button><FaPen style={{ color: '#6e8c91' }} /></button>
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
            <Link href="/">
                <a >&#60;- Back to home</a>
            </Link>
        </div>
    )
}

export default CrudFruits
