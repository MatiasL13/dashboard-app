<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
       
        <v-select 
          v-on:change="getWalletData"
          v-model="address"
          :items="wallets"
          item-text="address"
          item-value="address"
          label="Select Wallet"
          ></v-select>
        <v-alert v-if="isOld" type="warning">Wallet is old!</v-alert>
        <v-row justify="center">
          <v-col cols="5">
            <BlockExchange />
          </v-col>
          <v-col cols="5">
            <BlockBalance :address="this.address"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>



<script >
import {mapActions} from 'vuex';
import axios from "axios";

	export default{
    data(){
      return {
      address: "select a address",
      isOld: false
      
      }
    },
		computed:{
			wallets(){
          return this.$store.getters.loadedWallets;
      },
      
		},
    methods:{
      getWalletData(address){
        this.$store.dispatch("setAddress", address);
        console.log(address);
        this.$axios.$get(`/wallets/${address}/age`).then(data => {
          this.isOld = data ;
          console.log(data);
        })
      }

    }
	}
</script>