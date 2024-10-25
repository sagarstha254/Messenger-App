import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: number;
  name: string;
  type: 'incoming' | 'outgoing'; // This should match the expected types
}

interface MessagesState {
  messages: Message[];
  page: number;
}

const initialState: MessagesState = {
  messages: [],
  page: 1,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages(state, action: PayloadAction<Message[]>) {
      state.messages = [...action.payload, ...state.messages]; // Append new messages
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
});

export const { addMessages, incrementPage } = messagesSlice.actions;
export default messagesSlice.reducer;
