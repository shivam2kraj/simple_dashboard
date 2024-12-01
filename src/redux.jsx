import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filteredUsers: [],
  search: "",
  city: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    filterUsers(state) {
      let filtered = state.users;

      if (state.search) {
        filtered = filtered.filter((user) =>
          user.name.toLowerCase().includes(state.search.toLowerCase())
        );
      }

      if (state.city) {
        filtered = filtered.filter((user) => user.address.city === state.city);
      }

      state.filteredUsers = filtered;
    },
  },
});

export const { setUsers, setSearch, setCity, filterUsers } = userSlice.actions;
export default userSlice.reducer;
