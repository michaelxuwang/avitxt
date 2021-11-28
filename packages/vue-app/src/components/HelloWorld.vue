<template>
  <v-container>
    <v-row class="text-center mt-16">
      <v-col cols="12" class="mt-8">
        <v-img
          :src="require('../assets/logo.svg')"
          class=""
          contain
          height="300"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to AVIT(X)T
        </h1>

        <p class="subheading font-weight-regular">
          Accountable Verifiable Immutable Transparent Competitive Event Tracker
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >

        <v-row justify="center">
          <v-btn color="success" @click.prevent="$router.push('/create')" class="mx-3">Create</v-btn>
          <v-btn color="primary" @click.prevent="$router.push('/list')" class="mx-3">Search</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
    }),
  }
</script>
