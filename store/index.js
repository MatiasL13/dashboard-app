import Vue from "vue";
import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedWallets: [],
      isOld: false,
      loadedBalance: 0,
      usdRate: 0,
      eurRate: 0,
      loadedAddress: "",
      loadedCurrency: ""
    },
    mutations: {
      setWallets(state, wallets) {
        state.loadedWallets = wallets;
      },
      setIsOld(state, isOld) {
        state.isOld = isOld;
      },
      setUsdRate(state, usdRate) {
        state.usdRate = usdRate;
      },
      setEurRate(state, eurRate) {
        state.eurRate = eurRate;
      },
      setBalance(state, balance) {
        state.loadedBalance = balance;
      },
      setCurrency(state, currency) {
        state.loadedCurrency = currency;
      },
      setAddress(state, address) {
        state.loadedAddress = address;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get("wallets")
          .then(data => {
            const postsArray = [];
            console.log("data");
            console.log(data);
            for (const key in data) {
              console.log(key);
              postsArray.push({ ...data[key] });
            }
            vuexContext.commit("setWallets", postsArray);
          })
          .catch(e => context.error(e));
      },
      setWallets({ commit, state }, wallets) {
        commit("setWallets", wallets);
      },
      setAddress({ commit, state }, address) {
        commit("setAddress", address);
        if (state.loadedCurrency != "") {
          this.dispatch("setCurrency", {
            currency: state.loadedCurrency,
            address: address
          });
        }
      },
      setCurrency(vuexContext, { currency, address }) {
        vuexContext.commit("setCurrency", currency);
        this.$axios
          .$get(`rates/${currency}`)
          .then(data => {
            if (currency == "usd") vuexContext.commit("setUsdRate", data);
            else vuexContext.commit("setEurRate", data);
          })
          .catch(e => context.error(e));

        console.log(`wallets/${address}/balance/${currency}`);
        return this.$axios
          .$get(`wallets/${address}/balance/${currency}`)
          .then(data => {
            console.log(data);
            vuexContext.commit("setBalance", data);
          })
          .catch(e => context.error(e));
      },
      setExchangeRate({ commit, state }, amount) {
        if (state.loadedCurrency == "usd") commit("setUsdRate", amount);
        else commit("setEurRate", amount);
      },
      editExchangeRate({ commit, state }) {
        var currency = state.loadedCurrency;
        var address = state.loadedAddress;
        if (currency == "usd") var amount = state.usdRate;
        else var amount = state.eurRate;

        console.log("se modifica " + state.loadedCurrency + " con " + amount);
        return this.$axios
          .$put(`/rates/${state.loadedCurrency}`, { amount: amount })
          .then(data => {
            this.dispatch("setCurrency", { currency, address });
          })
          .catch(e => context.error(e));
      }
    },
    getters: {
      loadedCurrency(state) {
        return state.loadedCurrency;
      },
      loadedAddress(state) {
        return state.loadedAddress;
      },
      loadedWallets(state) {
        return state.loadedWallets;
      },
      isOld(state) {
        return state.isOld;
      },
      loadedBalance(state) {
        return state.loadedBalance;
      },
      loadedExchange(state) {
        if (state.loadedCurrency == "usd") return state.usdRate;
        else return state.eurRate;
      },
      usdRate(state) {
        return state.usdRate;
      }
    }
  });
};

export default createStore;
