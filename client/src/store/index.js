import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state() {
    return {
      user: null,
      token: null,
      beverages: [],
    };
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload.user;
      state.token = payload.token;
    },
    setBeverages(state, payload) {
      state.beverages = payload.beverages;
    },
    setBeverage(state, payload) {
      state.beverages.map((beverage) => {
        if (beverage._id === payload.beverage._id) {
          return payload.beverage;
        } else {
          return beverage;
        }
      });
    },
  },
  actions: {
    logout(context) {
      try {
        context.commit("setUser", { user: null, token: null });
      } catch (err) {
        console.log("error on vuex, logout: " + err);
      }
    },
    async registerUser({ commit }, { username, password }) {
      try {
        const userRequest = await fetch("http://localhost:8000/API/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        });
        if (!userRequest.ok) {
          throw new Error("User Already exists");
        }
        const user = await userRequest.json();
        commit("setUser", { user: user.user, token: user.token });
      } catch (error) {
        throw error;
      }
    },
    async loginUser({ commit }, { username, password }) {
      try {
        const userRequest = await fetch("http://localhost:8000/API/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        });
        if (!userRequest.ok) {
          throw new Error("Authentication Error");
        }
        const user = await userRequest.json();
        if (user.user && user.token) {
          commit("setUser", { user: user.user, token: user.token });
        } else {
          console.log("failed");
        }
      } catch (error) {
        throw error;
      }
    },
    async loadBeverages(context, { filter, country, type }) {
      let beveragesRequest;
      switch (filter) {
        case "all":
          beveragesRequest = await fetch(
            `http://localhost:8000/API/beverages?filter=all`
          );
          break;
        case "country":
          beveragesRequest = await fetch(
            `http://localhost:8000/API/beverages?filter=country&country=${country}`
          );
          break;
        case "type":
          beveragesRequest = await fetch(
            `http://localhost:8000/API/beverages?filter=type&type=${type}`
          )
      }

      const beverages = await beveragesRequest.json();
      context.commit("setBeverages", { beverages: beverages });
    },
    async addToCart(context, { amount, beverageId, userId, token }) {
      const updateRequest = await fetch(
        `http://localhost:8000/API/cart/add/${beverageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount, userId: userId }),
        }
      );
      const update = await updateRequest.json();
      context.commit("setUser", { user: update, token: token.value });
    },
    async cleanCart(context, {userId, token}) {
      const updateRequest = await fetch(
        "http://localhost:8000/API/cart/clean",{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({userId: userId})
        }
      );
      const update = await updateRequest.json();
      context.commit("setUser", {user: update, token: token.value});
    },
    async removeFromCart(context, { beverageId, userId, token }) {
      const updateRequest = await fetch(
        `http://localhost:8000/API/cart/remove/${beverageId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        }
      );
      const update = await updateRequest.json();
      context.commit("setUser", { user: update, token: token.value });
    },
    async createBeverage(
      context,
      { price, name, file, token, country, id, type }
    ) {
      try {
        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("price", price.value);
        formData.append("country", country.value);
        formData.append("file", file);
        formData.append("type", type.value);
        formData.append("id", id);
        const beveragesRequest = await fetch(
          "http://localhost:8000/admin/beverages/new",
          {
            method: "POST",
            headers: {
              Authorization: `VRFBER ${token}`,
            },
            body: formData,
          }
        );
        const beverages = await beveragesRequest.json();
        context.commit("setBeverages", beverages);
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
