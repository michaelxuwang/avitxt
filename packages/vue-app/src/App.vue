<template>
  <v-app>
    <v-app-bar
      app
      color="blue darken-1"
      dark
    >
      <router-link to="/" style="color:white !important; text-decoration:none;">
        <div class="d-flex align-center">
          <v-img
            alt="AVIT(X)T Logo"
            class="shrink mr-2"
            contain
            :src="require('./assets/logo.svg')"
            transition="scale-transition"
            width="48"
          />

          <h1>A</h1>ccountable
          <h1>V</h1>erifiable
          <h1>I</h1>mmutable
          <h1>T</h1>ransparent
          <h1>(X)</h1>
          <h1>T</h1>racker
        </div>
      </router-link>

      <v-spacer></v-spacer>

      <Account />
    </v-app-bar>

    <v-main>
      <!-- <v-breadcrumbs :items="breadcrumbs" class="ml-10"></v-breadcrumbs> -->
      
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  import Account from '@/components/Account.vue'


export default {
  name: 'App',

  data: () => ({
    //
  }),

  computed: {
    breadcrumbs() {
      return [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ];
    },
  },

  components: {
    Account
  },
};
</script>
