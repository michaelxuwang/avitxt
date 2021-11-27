<template>
    <v-row class="text-left" justify="center" v-if="data">
      <v-col class="mt-8" cols="10">
        <v-row>
          <v-col class="col-9">
            <h1 class="display-2 font-weight-bold mb-3">
              {{data.name}}
            </h1>
            Contract: {{address}}
          </v-col>
          <v-col>
            <p class="text-right">
              <v-btn v-if="roles && roles.isOwner" class="ml-2" color="normal" @click.prevent="$router.push('/edit/' + address)">Edit</v-btn>
              <v-btn class="ml-2" color="yellow accent-2" @click.prevent="fund">Fund</v-btn>
              <!-- <v-btn v-if="roles && roles.isJudge" class="ml-2" color="error" @click.prevent="$router.push('/judge/' + address)">Judge</v-btn> -->
              <!-- <v-btn v-if="roles && !roles.isOwner && !roles.isJudge" class="ml-2" color="success" @click.prevent="$router.push('/submit/' + address)">Apply</v-btn> -->
              <v-btn class="ml-2" color="success" @click.prevent="$router.push('/submit/' + address)">Apply</v-btn>
            </p>
            <p class="text-right">
              <v-btn color="primary" @click.prevent="$router.push('/list-submissions/' + address)">Submissions</v-btn>
            </p>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
        justify="left"
      >
        <h3>{{data.category}}</h3>
        <p>{{data.info}}</p>

        <p>
          Open Date: {{ new Date(parseInt(data.openDate) * 1000).toLocaleString() }}
        </p>
        <p>
          Close Date: {{ new Date(parseInt(data.closeDate) * 1000).toLocaleString() }}
        </p>
        <p>
          Finalize Date: {{ new Date(parseInt(data.finalizeDate) * 1000).toLocaleString() }}
        </p>

        <v-divider class="mt-8 mb-8"></v-divider>

        <h4>Requirements</h4>
        <p>
          {{data.requirementsInfo}}
        </p>

        <h4>Scoring Rubrics</h4>
        <div>
          <div v-for="(item, index) in data.scoringRubrics.labels" :key="index" class="">
            {{item}}: {{data.scoringRubrics.weights[index]}}%
          </div>
        </div>

        <p/>
        <h4>External Data Sources</h4>
        <div>
          <div v-for="(item, index) in data.externalDataSources.labels" :key="index" class="">
            {{item}}: {{data.externalDataSources.urls[index]}}
          </div>
        </div>

        <p/>
        <h4>Submission Fee</h4>
        {{data.submissionFee}}

        <v-divider class="mt-8 mb-8"></v-divider>

        <h4>Judges</h4>
        <div v-if="data" class="mt-8">
          <div v-for="(item, index) in data.judges" :key="index" class="mt-2">
            <v-icon>mdi-account-box</v-icon> {{ item }}
          </div>
        </div>

        <v-divider class="mt-8 mb-8"></v-divider>

        <h4>Privacy</h4>
        Not Implemented Yet

      </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'ViewCompetition',

    data: () => ({
        address: null,
        contract: null,
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
              this.contract = await this.$moralis.getContract('Competition', this.address);
              console.log('contract', this.contract);

              this.data = await this.contract.fetchAllPlainData();
              console.log('data', this.data);

              if (this.$store.state.user)
                this.roles = await this.contract.methods.getRoles(this.$store.state.userAddress).call();
              else
                this.roles = null;
              console.log('roles', this.roles);
            } catch (e) {
                console.log(e);
            }
        },

        async fund() {
          alert('Not implemented yet.');
        }
    },

    watch: {
      '$route': 'fetchData'
    }
}
</script>
