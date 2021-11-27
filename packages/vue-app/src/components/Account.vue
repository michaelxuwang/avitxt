<template>
    <div>
        <span v-if="$store.state.user === null">
            <v-progress-circular
                indeterminate
                color="amber"
                class="mr-2"
                v-show="txing"
            ></v-progress-circular>
            <v-btn @click.prevent="login" color="primary" elevation="2" :disabled="txing">
                Login
            </v-btn>
        </span>
        <span v-else>
            <span class="address"> {{$store.state.userAddress}} </span>
            <v-btn @click.prevent="logout" color="secondary" elevation="2">
                Logout
            </v-btn>
        </span>
    </div>
</template>

<script>
export default {
  name: 'Account',
  data: () => ({
      txing: false,
  }),
  created: function() {
      this.$store.commit('setUser', this.$moralis.User.current());
  },
  methods: {
    login: async function() {
        this.txing = true;
        try {
            const user = await this.$moralis.authenticate({ signingMessage: "Log in using Moralis" });
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
            this.$store.commit('setUser', user);
        } catch(e) {
            console.log(e);
            this.$store.commit('setUser', null);
            alert(e.message ? e.message : JSON.stringify(e));
        }
        this.txing = false;
    },

    logout: async function() {
        await this.$moralis.User.logOut();
        this.$store.commit('setUser', null);
    }
  }
}
</script>

<style scoped>
.address {
    width: 100px;
}
</style>
