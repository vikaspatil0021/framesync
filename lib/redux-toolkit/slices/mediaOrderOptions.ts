import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderBy: {
        "uploaded_at": 'asc'
    }
}

const orderSortSlice = createSlice({
    name: 'ordeSortSLice',
    initialState,
    reducers: {
        updateOrder: (state, action) => {
            state.orderBy = action.payload
        }
    }
});

export const { updateOrder } = orderSortSlice.actions;

export default orderSortSlice.reducer;

