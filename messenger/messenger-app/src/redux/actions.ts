// src/redux/actions.ts
import { AppDispatch, RootState } from "./store";
import { addMessages, incrementPage } from "./reducers";
import axios from "axios";

const API_URL = "https://gorest.co.in/public/v2/users";

export const fetchMessages =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { page } = getState().messages;
    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
      const users = response.data.map((user: any, index: number) => ({
        id: user.id,
        name: user.name,
        type: index % 2 === 0 ? "incoming" : "outgoing",
      }));

      dispatch(addMessages(users));
      dispatch(incrementPage());
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
