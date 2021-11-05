import { createSlice } from '@reduxjs/toolkit'
// Slice
const slice = createSlice({
  name: 'fruits',
  initialState: {
    fruits: [{name: 'Red', emoji:'¢'}],
  },
  reducers: {
    showFruits: (state, action) => {
      state.fruits = action.payload;
    },

  },
});
export default slice.reducer
// Actions
// const { showFruits } = slice.actions
// export const getFruits = () => async dispatch => {
//   try {
//     // const res = await api.post('/api/auth/login/', { fruitName, password })
//     dispatch(showFruits());
//   } catch (e) {
//     return console.error(e.message);
//   }
// }

// export const logout = () => async dispatch => {
//   try {
//     // const res = await api.post('/api/auth/logout/')
//     return dispatch(logoutSuccess())
//   } catch (e) {
//     return console.error(e.message);
//   }
// }