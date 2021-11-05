import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
    name: 'fruits',
    initialState: {
        fruits: [{ name: 'Red', emoji: '¢', id: 1 }],
    },
    reducers: {

        addFruit: (state, action) => {
            const newFruit = action.payload.newFruit;
            const id = Math.floor(Math.random()*1000)
            newFruit.id = id;
            state.fruits.push(newFruit)
        },

        deleteFruit: (state, action) => {
            const { id } = action.payload
            state.fruits = state.fruits.filter(fruit => fruit.id !== id)
        },

        editFruit: (state, action) => {
            const { id, name, emoji } = action.payload
            state.fruits = state.fruits.map(fruit => fruit.id === id ? {name, emoji, id} : fruit)
        },

    },
});

export const { addFruit, deleteFruit, editFruit } = slice.actions

export const fruitReducer = slice.reducer
