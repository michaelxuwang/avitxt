<template>
    <v-row class="text-center" justify="center">
      <v-col class="mb-4">
          <br>
        <h1 class="display-2 font-weight-bold mb-3">
          Submission <span v-if="data">for {{data.name}} </span>
        </h1>
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
      >
        {{ submissionId }}

        {{ submissionData }}
        <!-- <v-text-field
            v-model="name"
            label="Name"
            :rules="nameRules"
        ></v-text-field>

        <v-textarea
          v-model="info"
          label="Submission Data"
        ></v-textarea>

        <v-btn @click.prevent="create" color="success">Submit</v-btn> -->
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
        v-if="roles && roles.isJudge"
      >
        <v-text-field
            v-model="judgeScores"
            label="Your scores"
        ></v-text-field>

        <v-btn @click.prevent="scoreSubmission" color="success">Submit Score</v-btn>
      </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'ViewSubmission',

    data: () => ({
        address: null,
        submissionId: null,
        contract: null,
        data: null,
        submissionData: null,
        roles: null,
        judgeScores: '[]',
    }),

    created() {
      this.fetchData();
    },

    methods: {
        async fetchData () {
            try {
              this.address = this.$route.params.address;
              this.submissionId = this.$route.params.submissionId;
              this.contract = await this.$moralis.getContract('Competition', this.address);
              console.log('contract', this.contract);

              this.data = await this.contract.fetchAllPlainData();
              this.roles = await this.contract.methods.getRoles(this.$moralis.User.current().attributes.ethAddress).call();

              const submissionData = await this.contract.methods.submissions(this.submissionId).call();
              submissionData.allScoreSheets = await this.contract.methods.getSubmissionScoreSheets(this.submissionId).call();
              this.submissionData = submissionData;
              console.log('submission data', this.submissionData);
            } catch (e) {
                console.log(e);
            }
        },

        async scoreSubmission() {
            try {
                const receipt = await this.contract.methods
                    .scoreSubmission(this.submissionId, JSON.parse(this.judgeScores))
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
