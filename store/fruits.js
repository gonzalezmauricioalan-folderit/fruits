import { createSlice } from '@reduxjs/toolkit'
import firebase from '../firebase/clientApp'


// Slice
const slice = createSlice({
    name: 'fruits',
    initialState: {
        fruits: [],
    },
    reducers: {

        addFruit: (state, action) => {
            const newFruit = action.payload.newFruit;
            state.fruits.push(newFruit)
        },

        deleteFruit: (state, action) => {
            const { id } = action.payload
            state.fruits = state.fruits.filter(fruit => fruit.id !== id)
        },

        editFruit: (state, action) => {
            const { id, name, emoji } = action.payload
            state.fruits = state.fruits.map(fruit => fruit.id === id ? { name, emoji, id } : fruit)
        },

        updateFruits: (state, action) => {
            const { fruits } = action.payload
            state.fruits = fruits
        },

    },
});

export const { addFruit, deleteFruit, editFruit, updateFruits } = slice.actions

export const fruitReducer = slice.reducer


export const getFruitsFromFirestore = () => async dispatch => {
    try {
        const db = firebase.firestore()
        const fruitsQuery = await db.collection('fruits').get()
        const fruits = fruitsQuery.docs.map(doc => { 
            const fruit = doc.data()
            fruit.id = doc.id
            return fruit
         });
        dispatch(updateFruits({ fruits }));
    } catch (e) {
        return console.error(e.message);
    }
}

export const addFruitsToFirestore = ({name, emoji}) => async dispatch => {
    try {
        const db = firebase.firestore()
        const newFruit = {name, emoji}
        const savedFruitInformation = await db.collection('fruits').add(newFruit)
        newFruit.id = savedFruitInformation.id
        dispatch(addFruit({ newFruit }));
    } catch (e) {
        return console.error(e.message);
    }
}

export const deleteFruitFromFirestore = (id) => async dispatch => {
    try {
        const db = firebase.firestore()
        await db.collection('fruits').doc(id).delete()
        dispatch(deleteFruit({ id }));
    } catch (e) {
        return console.error(e.message);
    }
}

export const editFruitInFirestore = ({ id, name, emoji }) => async dispatch => {
    try {
        const db = firebase.firestore()
        await db.collection('fruits').doc(id).set({name, emoji})
        dispatch(editFruit({ id, name, emoji }));
    } catch (e) {
        return console.error(e.message);
    }
}