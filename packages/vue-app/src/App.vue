<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>

        <h1>A</h1>ccountable
        <h1>V</h1>erifiable
        <h1>I</h1>mmutable
        <h1>T</h1>ransparent
        <h1>(X)</h1>
        <h1>T</h1>racker
      </div>

      <v-spacer></v-spacer>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
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
