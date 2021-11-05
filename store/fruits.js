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
            const id = Math.floor(Math.random() * 1000)
            newFruit.id = id;
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
            console.log(`action`, action)
            state.fruits = fruits
        },

    },
});

export const { addFruit, deleteFruit, editFruit, updateFruits } = slice.actions

export const fruitReducer = slice.reducer


export const getFruitsFromFirestore = () => async dispatch => {
    try {
        const db = firebase.firestore()
        console.log('objecaaaaat')
        const fruitsQuery = await db.collection('fruits').get()
        const fruits = fruitsQuery.docs.map(doc => doc.data());
        dispatch(updateFruits({ fruits }));
    } catch (e) {
        return console.error(e.message);
    }
}