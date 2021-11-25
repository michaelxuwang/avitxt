<template>
    <v-row class="text-center" justify="center">
      <v-col class="mb-4">
          <br>
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

        <v-btn @click.prevent="create" color="success">Create</v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'CreateCompetition',

    data: () => ({
        name: '',
        nameRules: [
            value => !!value || 'Required.',
            value => (value || '').length <= 40 || 'Max 40 characters',
        ],

        categories: ['College Admission', 'Job Application', 'Scholarship', 'Hackathon'],
        category: '',

        info: '',
    }),

    methods: {
        async create() {
            try {
                console.log('create', this.name, this.info, this.category);
                const contract = await this.$moralis.getContract('CompetitionFactory');
                console.log('contract', contract);
                const receipt = await contract.methods.createCompetition(this.name, this.info, this.category)
                    .send({from: this.$moralis.User.current().attributes.ethAddress});
                console.log('receipt', receipt);

                const compAddress = receipt.events.CompetitionCreated.returnValues.competitionAddress;
                console.log('competition address', compAddress);

                this.$router.push(`/view/${compAddress}`);
            } catch (e) {
                console.log(e);
            }
        },
    }
}
</script>
