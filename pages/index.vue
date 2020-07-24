<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <logo />
        <ethereum-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          Code challenge securitize
        </v-card-title>
        <v-card-text>
         
          <a
            href="https://github.com/MatiasL13/dashboard-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            dashboard API
          </a>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/exchange"
          >
            Continue with Exchange data 
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import EthereumLogo from '~/components/EthereumLogo.vue'

export default {
  components: {
    Logo,
    EthereumLogo
  }
}
</script>
