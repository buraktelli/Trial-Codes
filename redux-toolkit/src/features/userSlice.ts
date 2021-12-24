import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'

interface InitialState {
    data: any | null;
    loading: boolean;
    error: string;
}

const initialState: InitialState = {
    data: null,
    loading: false,
    error: ""
}

export const fetchUser = createAsyncThunk("fetchUser", async () => {
    const response = await axios.get<any>('https://dev-gis.ankageo.com/rest/v1/services')
    console.log(response);
    
    return response.data;
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
            state.error = ""
        })
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>)=>{
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchUser.rejected, (state, action)=>{
            state.loading = false;
            state.error = 'Error fetching data'
        })
    }
})

export default userSlice.reducer;