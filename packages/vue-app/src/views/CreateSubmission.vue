<template>
    <v-row class="text-center" justify="center">
      <v-col class="mb-4">
          <br>
        <h1 class="display-2 font-weight-bold mb-3">
          Create Submission <span v-if="data">for {{data.name}} </span>
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

        <v-textarea
          v-model="info"
          label="Submission Data"
        ></v-textarea>

        <v-btn @click.prevent="create" color="success">Submit</v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'CreateSubmission',

    data: () => ({
        address: null,
        contract: null,
        data: null,

        name: '',
        nameRules: [
            value => !!value || 'Required.',
            value => (value || '').length <= 80 || 'Max 80 characters',
        ],

        info: '',
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
            } catch (e) {
                console.log(e);
            }
        },

        async create() {
            try {
                const receipt = await this.contract.methods.addSubmission(this.info)
                    .send({
                      from: this.$moralis.User.current().attributes.ethAddress,
                      value: this.data.submissionFee
                    });
                console.log('receipt', receipt);

                const submissionId = receipt.events.SubmissionAdded.returnValues.submissionId;
                console.log('submission id', submissionId);

                this.$router.push(`/view/${this.address}/${submissionId}`);
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
