import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state() {
    return {
      user: null,
      token: null,
      items: null,
    }
  },
  getters: {
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },
    setItems(state, payload) {
      state.items = payload.items;
    },
    setItem(state, payload) {
      items.map( (item) => {
        if(item._id === payload.item._id){
          return payload.item;
        }
        else {
          return item;
        }
      })
    }
  },
  actions: {
    async registerUser(context, username, password) {
      const userRequest = await fetch("http://localhost:8000/API/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: username, password: password})
      });
      const user = await userRequest.json();
      context.commit(setUser, user.user);
      context.commit(setToken, user.token);
    },
    async loginUser(context) {
      const userRequest = await fetch("http://localhost:8000/API/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: username, password: password})
      });
      const user = await userRequest.json();
      context.commit(setUser, user.user);
      context.commit(setToken, user.token);
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
