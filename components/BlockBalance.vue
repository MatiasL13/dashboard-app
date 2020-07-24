<template>
  <v-card class="pa-2" outlined tile>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">OVERLINE</div>
        <v-select
          :disabled="this.address == 'select a address'"
          v-on:change="getExchange"
          v-model="currency"
          :items="items"
          item-text="text"
          item-value="text"
          label="Select currency"
        ></v-select>
        <v-list-item-title class="headline mb-1">{{balance}}$</v-list-item-title>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>


<script >
import { mapActions } from "vuex";
import axios from "axios";

export default {
  props: ["address"],
  data() {
    return {
      currency: "select a currency",
      items: [{ text: "select a currency" }, { text: "usd" }, { text: "eur" }]
    };
  },
  computed: {
    balance() {
      return this.$store.getters.loadedBalance;
    }
  },

  methods: {
    getExchange() {
      if (this.currency == "usd" || this.currency == "eur")
        this.$store
          .dispatch("setCurrency", {
            currency: this.currency,
            address: this.address
          })
          .then(() => {});
    }
  }
};
</script>