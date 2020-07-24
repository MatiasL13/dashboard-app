
const state ={
	wallets: []
};

const mutations = {
	setWallets(state, wallets){
		state.wallets = wallets;
	}

};

const actions = {
	
	setWallets: ({commit}) =>{
		commit('setWallets', as);
	},
	
};


const getters ={
	wallets: state=>{
		return state.wallets;
	}
};

export default{
	state,
	mutations,
	actions,
	getters
}