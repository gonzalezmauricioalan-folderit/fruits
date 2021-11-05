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

    },
});

export const { addFruit } = slice.actions

export const fruitReducer = slice.reducer

// //Actions
// const { showFruits } = slice.actions
// export const getFruits = () => async dispatch => {
//     try {
//         // const res = await api.post('/api/auth/login/', { fruitName, password })
//         const initialState = {
//             fruits: [{ name: 'Red', emoji: '¢', id:'asdnasj14134' }],
//         }
//         dispatch(showFruits(initialState));
//     } catch (e) {
//         return console.error(e.message);
//     }
// }

// export const logout = () => async dispatch => {
//   try {
//     // const res = await api.post('/api/auth/logout/')
//     return dispatch(logoutSuccess())
//   } catch (e) {
//     return console.error(e.message);
//   }
// }