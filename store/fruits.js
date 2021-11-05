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
            console.log(`action`, action)
            const { id } = action.payload
            console.log(`id`, id)
            state.fruits = state.fruits.filter(fruit => fruit.id !== id)
        },

    },
});

export const { addFruit, deleteFruit } = slice.actions

export const fruitReducer = slice.reducer
