import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';
import { toggleFavorite } from '../favorites/favoritesSlice';

//Fetch Comments Thunk
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await fetch(baseUrl + 'comments');
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

//Post Comments thunk
export const postComment = createAsyncThunk(
    'comments/postComment',
    async (payload, {dispatch, getState}) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const { comments } = getState();
                
                // Add date and id to the comment (payload)
                payload.date = new Date().toISOString();
                payload.id = comments.commentsArray.length;

                // Dispatch addComment action
                dispatch(addComment(payload));

                // Resolve the promise with the payload
                resolve(payload);
            }, 2000);
        });
    }
);


const commentsSlice = createSlice({
    name: 'comments',
    initialState: { isLoading: true, errMess: null, commentsArray: [] },
    reducers: {
        // Adding the addComment reducer
        addComment: (state, action) => {
            state.commentsArray.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.commentsArray = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const { addComment } = commentsSlice.actions;

export const commentsReducer = commentsSlice.reducer;