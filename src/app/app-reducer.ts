import {Dispatch} from 'redux'
import {authAPI} from 'api/todolists-api'
import {setIsLoggedIn} from 'features/auth/auth.reducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitialStateType = typeof initialState

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppError: (state, action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error
        },
        setAppStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppInitialized: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppError, setAppStatus, setAppInitialized} = slice.actions



export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: true}));
        } else {

        }

        dispatch(setAppInitialized({isInitialized: true}));
    })
}
//
// export type SetAppErrorActionType = ReturnType<typeof setAppError>
// export type SetAppStatusActionType = ReturnType<typeof setAppStatus>
