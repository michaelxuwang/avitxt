<template>
    <div>
        <span v-if="user === null">
            <v-btn @click.prevent="login" color="primary" elevation="2" rounded>
                Login
            </v-btn>
        </span>
        <span v-else>
            <span class="address"> {{user.get("ethAddress")}} </span>
            <v-btn @click.prevent="logout" color="secondary" elevation="2" rounded>
                Logout
            </v-btn>
        </span>
    </div>
</template>

<script>
export default {
  name: 'Account',
  data: () => ({
      user: null
  }),
  created: function() {
      this.user = this.$moralis.User.current();
  },
  methods: {
    login: async function() {
        try {
            this.user = await this.$moralis.authenticate({ signingMessage: "Log in using Moralis" });
            console.log("logged in user:", this.user);
            console.log(this.user.get("ethAddress"));
        } catch(e) {
            console.log(e);
        }
    },

    logout: async function() {
        await this.$moralis.User.logOut();
        this.user = null;
    }
  }
}
</script>

<style scoped>
.address {
    width: 100px;
}
</style>
