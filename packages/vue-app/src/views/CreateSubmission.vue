<template>
  <div>
    <div style="position:fixed">
      <router-link :to="'/view/' + address" style="text-decoration: none;">
        <v-btn
          icon
          class="ml-2 mt-4"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </router-link>
    </div>
    <v-row class="text-justify" justify="center" v-if="data">
      <v-col class="mt-8" cols="10">
        <h1 class="display-2 font-weight-bold mb-3">
          Apply to {{data.name}}
        </h1>
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
      >
        <h4>Requirements</h4>
        <p>
          {{data.requirementsInfo}}
        </p>

        <p/>
        <h4>Submission Fee</h4>
        {{data.submissionFee}}

        <v-divider class="mt-8 mb-8"></v-divider>

        <v-text-field
            v-model="name"
            label="Name"
            :rules="nameRules"
        ></v-text-field>

        <v-text-field
            v-model="uid"
            label="Universal ID"
            :rules="nameRules"
        ></v-text-field>

        <!-- <v-text-field
            v-model="file"
            label="Upload File"
        ></v-text-field> -->
        
        <v-file-input
          v-model="file"
          label="Upload File"
          show-size
        ></v-file-input>

        <v-textarea
          v-model="info"
          label="Submission Data"
        ></v-textarea>

        <v-btn @click.prevent="create" color="success" :disabled="txing || !$store.state.user">Submit</v-btn>
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
  </div>
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

        uid: '',
        info: '',
        file: null,

        txing: false,
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
            this.txing = true;
            try {
                const mFile = this.file ? new this.$moralis.File(this.file.name, this.file) : null;
                let ipfsFile = '';
                if (mFile) {
                  await mFile.saveIPFS();
                  ipfsFile = mFile.ipfs();
                }

                const receipt = await this.contract.methods.addSubmission(
                  this.name,
                  this.uid,
                  this.info,
                  ipfsFile
                ).send({
                  from: this.$store.state.userAddress,
                  value: this.data.submissionFee
                });
                console.log('receipt', receipt);

                const submissionId = receipt.events.SubmissionAdded.returnValues.submissionId;
                console.log('submission id', submissionId);

                this.$router.push(`/view/${this.address}/${submissionId}`);
            } catch (e) {
                console.log(e);
                alert(e.message ? e.message : JSON.stringify(e));
            }
            this.txing = false;
        },
    },

    watch: {
      '$route': 'fetchData'
    }
}
</script>
