import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
      set: (state, action) => {
        state = action
      },
    },
  })

  // Action creators are generated for each case reducer function
  export const { set } = userSlice.actions

  export default userSlice.reducer
