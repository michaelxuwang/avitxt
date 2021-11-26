<template>
    <v-row class="text-center" justify="center">
      <v-col class="mb-4">
          <br>
        <h1 class="display-2 font-weight-bold mb-3">
          View Competition
        </h1>
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
      >
        {{address}}
        {{data}}
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
      >
        <v-btn v-if="roles && roles.isOwner" color="primary" @click.prevent="$router.push('/edit/' + address)">Edit</v-btn>
        <v-btn v-if="roles && roles.isJudge" color="primary" @click.prevent="$router.push('/judge/' + address)">Judge</v-btn>
        <!-- <v-btn v-if="roles && !roles.isOwner && !roles.isJudge" color="success" @click.prevent="$router.push('/submit/' + address)">Apply</v-btn> -->
        <v-btn color="success" @click.prevent="$router.push('/submit/' + address)">Apply</v-btn>
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
      >
        <v-btn color="primary" @click.prevent="$router.push('/list-submissions/' + address)">Rankings</v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'ViewCompetition',

    data: () => ({
        address: null,
        data: null,
        roles: null
    }),

    created() {
      this.fetchData();
    },

    methods: {
        async fetchData () {
            try {
              this.address = this.$route.params.address;
              const contract = await this.$moralis.getContract('Competition', this.address);
              console.log('contract', contract);
              this.data = await contract.fetchAllPlainData();
              this.roles = await contract.methods.getRoles(this.$moralis.User.current().attributes.ethAddress).call();
              console.log('data address', this.data, this.roles);
            } catch (e) {
                console.log(e);
            }
        },
    },

    watch: {
      '$route': 'fetchData'
    }
}
</script>
