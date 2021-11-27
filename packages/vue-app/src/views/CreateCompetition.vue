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
          label="Category"
        ></v-select>

        <v-textarea
          v-model="info"
          label="Description"
        ></v-textarea>

        <v-btn @click.prevent="create" color="success" :disabled="txing">
          Create
        </v-btn>
        <v-progress-circular
          indeterminate
          color="primary"
          class="ml-2"
          v-show="txing"
        ></v-progress-circular>
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
            value => (value || '').length <= 40 || 'Max 40 characters',
        ],

        categories,
        category: '',

        info: '',

        txing: false,
    }),

    methods: {
        async create() {
            try {
                this.txing = true;

                console.log('create', this.name, this.info, this.category);
                const contract = await this.$moralis.getContract('CompetitionFactory');
                console.log('contract', contract);
                const receipt = await contract.methods.createCompetition(this.name, this.info, this.category)
                    .send({from: this.$moralis.User.current().attributes.ethAddress});
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
