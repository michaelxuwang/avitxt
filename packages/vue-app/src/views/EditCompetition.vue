<template>
    <v-row class="text-center" justify="center">
      <v-col class="mb-4">
          <br>
        <h1 class="display-2 font-weight-bold mb-3">
          Edit Competition
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

        {{ data }}

        <v-btn @click.prevent="save" color="success">Save</v-btn>
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
      >
        <v-text-field
            v-model="requirementLabels"
            label="Requirement Labels"
        ></v-text-field>

        <v-text-field
            v-model="requirementWeights"
            label="Requirement Weights"
        ></v-text-field>

        <v-btn @click.prevent="setRequirements" color="success">Set Requirements</v-btn>
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
      >
        {{ data ? data.judges : ''}}
        <v-text-field
            v-model="judge"
            label="Judge Address"
        ></v-text-field>

        <v-btn @click.prevent="addJudge" color="success">Add Judge</v-btn>
      </v-col>
    </v-row>
</template>

<script>
import categories from "../config/categories.json";

export default {
    name: 'EditCompetition',

    data: () => ({
        address: null,
        contract: null,
        data: null,

        name: '',
        nameRules: [
            value => !!value || 'Required.',
            value => (value || '').length <= 40 || 'Max 40 characters',
        ],

        categories,
        category: '',

        info: '',

        requirementLabels: '[]',
        requirementWeights: '[]',

        judge: '',
    }),

    created() {
      this.fetchData();
    },

    methods: {
        async fetchData () {
            try {
              this.address = this.$route.params.address;
              this.contract = await this.$moralis.getContract('Competition', this.address);
              console.log('contract', this.contract);
              this.data = await this.contract.fetchAllPlainData();
              this.name = this.data.name;
              this.category = this.data.category;
              this.info = this.data.info;

            } catch (e) {
                console.log(e);
            }
        },

        async save() {
            // try {
            //     console.log('create', this.name, this.info, this.category);
            //     const contract = await this.$moralis.getContract('CompetitionFactory');
            //     console.log('contract', contract);
            //     const receipt = await contract.methods.createCompetition(this.name, this.info, this.category)
            //         .send({from: this.$moralis.User.current().attributes.ethAddress});
            //     console.log('receipt', receipt);

            //     const compAddress = receipt.events.CompetitionCreated.returnValues.competitionAddress;
            //     console.log('competition address', compAddress);

            //     this.$router.push(`/view/${compAddress}`);
            // } catch (e) {
            //     console.log(e);
            // }
        },

        async addJudge() {
            try {
                const receipt = await this.contract.methods.addJudge(this.judge)
                    .send({
                      from: this.$moralis.User.current().attributes.ethAddress,
                    });
                console.log('receipt', receipt);
                this.fetchData();
            } catch (e) {
                console.log(e);
            }
        },

        async setRequirements() {
            try {
                const receipt = await this.contract.methods
                    .setRequirements(JSON.parse(this.requirementLabels), JSON.parse(this.requirementWeights))
                    .send({
                      from: this.$moralis.User.current().attributes.ethAddress,
                    });
                console.log('receipt', receipt);
                this.fetchData();
            } catch (e) {
                console.log(e);
            }
        }
    },

    watch: {
      '$route': 'fetchData'
    }
}
</script>
