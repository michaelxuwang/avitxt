<template>
    <v-row class="text-left" justify="center">
      <v-col class="mt-8" cols="10">
        <h1 class="display-2 font-weight-bold mb-3">
          Create Competition
        </h1>
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
      >
        <v-text-field
            v-model="name"
            label="Name"
            :rules="nameRules"
        ></v-text-field>

        <v-select
          v-model="category"
          :items="categories"
          item-value="value"
          item-text="value"
          label="Category"
        ></v-select>

        <v-textarea
          v-model="info"
          label="Description"
        ></v-textarea>

        <v-btn @click.prevent="create" color="success" :disabled="txing || !$store.state.user">
          Create
        </v-btn>
        <v-progress-circular
          indeterminate
          color="primary"
          class="ml-2"
          v-show="txing"
        ></v-progress-circular>
        <span
          class="red--text ml-2"
          v-show="!$store.state.user"
        >Login first</span>
      </v-col>
    </v-row>
</template>

<script>

import categories from "../config/categories.json";

export default {
    name: 'CreateCompetition',

    data: () => ({
        name: '',
        nameRules: [
            value => !!value || 'Required.',
            // value => (value || '').length <= 200 || 'Max 400 characters',
        ],

        categories,
        category: '',

        info: '',

        txing: false,
    }),

    methods: {
        async create() {
            this.txing = true;
            try {
                console.log('create', this.name, this.info, this.category);
                const contract = await this.$moralis.getContract('CompetitionFactory');
                console.log('contract', contract);
                const receipt = await contract.methods.createCompetition(this.name, this.info, this.category)
                    .send({from: this.$store.state.userAddress});
                console.log('receipt', receipt);

                const compAddress = receipt.events.CompetitionCreated.returnValues.competitionAddress;
                console.log('competition address', compAddress);

                this.$router.push(`/edit/${compAddress}`);
            } catch (e) {
                console.log(e);
                alert(e.message ? e.message : JSON.stringify(e));
            }

            this.txing = false;
        },
    }
}
</script>
