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
    <v-row class="text-left" justify="center" v-if="data">
      <v-col class="mt-8" cols="10">
        <h1 class="display-2 font-weight-bold mb-3">
          {{data.name}} Submissions
        </h1>
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
      >
        <v-data-table v-if="submissions"
            :headers="headers"
            :items="submissions"
            item-key="submissionId"
            class="elevation-1"
            :search="search"
        >
            <template v-slot:top>
                <v-text-field
                v-model="search"
                label="Search"
                class="mx-4"
                ></v-text-field>
            </template>
            <!-- <template v-slot:header.submissionId="{ header }">
              <v-icon>mdi-account-box-outline</v-icon> {{ header.text }}
            </template> -->
            <template v-slot:item.submissionId="{ item }">
                <router-link :to="'/view/' + address + '/' + item.submissionId" style="text-decoration:none;">
                    <v-icon>mdi-account-box-outline</v-icon>
                    {{ item.name }} ({{item.submissionId}})
                </router-link>
            </template>
            <template v-slot:item.submissionDate="{ item }">
                {{ item.submissionDate.toLocaleString() }}
            </template>
            <template v-slot:item.iJudged="{ item }">
              <v-simple-checkbox
                v-model="item.iJudged"
                color="green"
                disabled
                @-click.prevent="$router.push('/view/' + address + '/' + item.submissionId)"
              ></v-simple-checkbox>
            </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    name: 'ListSubmissions',

    data: () => ({
        address: null,
        contract: null,
        data: null,
        roles: null,

        submissions: null,
        search: '',
    }),

    computed: {
      headers () {
        const h = [
          {
            text: 'Applicant',
            align: 'start',
            value: 'submissionId',
          },
          { text: 'Weighted Score', value: 'weightedScore' },
          { text: 'Submission Date', value: 'submissionDate' },
        ];
        
        if (this.roles && this.roles.isJudge) {
          h.push({
            text: 'My Judging', value: 'iJudged'
          });
        }

        return h;
      },
    },

    created() {
      this.fetchData();
    },

    methods: {
        async fetchData () {
            try {
              this.address = this.$route.params.address;
              this.contract = await this.$moralis.getContract('Competition', this.address);
              this.data = await this.contract.fetchAllPlainData();
              if (this.$store.state.user)
                this.roles = await this.contract.methods.getRoles(this.$store.state.userAddress).call();
              else
                this.roles = null;

              const submissions = await Promise.all(
                this.data.applicants.map(x =>
                  this.contract.methods.submissions(x).call()));
              
              const judgeScoreSheets = (this.roles && this.roles.isJudge)
                ? await Promise.all(
                  this.data.applicants.map(x =>
                    this.contract.methods.getSubmissionScoreSheetByJudge(x, this.$store.state.userAddress).call()))
                : null;

              for (let i=0; i<this.data.applicants.length; i++) {
                submissions[i].submissionId = this.data.applicants[i];
                submissions[i].submissionDate = new Date(parseInt(submissions[i].submissionDate) * 1000);
                if (this.roles && this.roles.isJudge)
                  submissions[i].iJudged = (judgeScoreSheets[i].scoreDate > 0);
              }
              this.submissions = submissions;
              console.log('submissions', this.submissions, judgeScoreSheets);
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
