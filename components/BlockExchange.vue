<template>
  <v-card class="pa-2" outlined tile>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Exchange rate</div>
        <v-list-item-title class="headline mb-1">
          <v-text-field
            label="change Rate"
            v-model="exchageRate"
            :value="exchageRate"
            :disabled="disabled"
          >{{exchageRate}}</v-text-field>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn @click.prevent="enabledInput" text>{{editButton}}</v-btn>
      <v-btn v-show="!disabled" @click.prevent="editChangeRate" text>Confirm</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script >
import { mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      disabled: true,
      editButton: "Edit"
    };
  },
  computed: {
    exchageRate: {
      get() {
        return this.$store.getters.loadedExchange;
      },
      set(value) {
        this.$store.dispatch("setExchangeRate", value);
      }
    }
  },

  methods: {
    enabledInput() {
      this.disabled = !this.disabled;
      if (this.disabled == true) this.editButton = "Edit";
      else this.editButton = "Cancel";
    },
    editChangeRate() {
      this.$store.dispatch("editExchangeRate").then(() => {
        this.enabledInput();
      });
    }
  }
};
</script>