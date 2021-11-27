<template>
    <v-row class="text-left" justify="center" v-if="data && submissionData">
      <v-col class="mt-8" :cols="showJudge ? 8 : 10">
        <v-row>
          <v-col class="col-7">
            <h1 class="display-2 font-weight-bold mb-3">
              {{submissionData.name}}
            </h1>
            {{submissionId}}
          </v-col>
          <v-col class="text-right">
            <h3>
              {{data.name}}
              <br>
              Submission
              <br>
              <v-btn v-if="roles && roles.isJudge" class="ml-2" color="error" @click.prevent="showJudge=!showJudge">Judge</v-btn>
            </h3>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="mr-auto">
            <p>
              Universal ID: {{submissionData.uid}}
            </p>
            <p>
              Submission Time: {{new Date(parseInt(submissionData.submissionDate) * 1000).toLocaleString()}}
            </p>
            <p>
              Submission File: <a :href="submissionData.file">{{submissionData.file}}</a>
            </p>
          </v-col>
          <v-col cols="auto" class="text-center">
            <v-sheet width="100px" class="primary white--text rounded-lg" rounded>
              <h1>{{submissionData.weightedScore}}</h1>
              <div>Score</div>
            </v-sheet>
          </v-col>
        </v-row>

        {{ submissionData.info }}

        <v-divider class="mt-8 mb-8"></v-divider>
        <h3>Score Sheets</h3>

        <v-data-table v-if="scoreSheets"
            :headers="headers"
            :items="scoreSheets"
            class="elevation-1"
            hide-default-footer
        >
            <template v-slot:item.judge="{ item }">
                <router-link :to="'/view-judge/' + item.judge">
                    {{ item.judge }}
                </router-link>
            </template>
            <template v-slot:item.scoreDate="{ item }">
                {{ new Date(item.scoreDate).toLocaleString() }}
            </template>
        </v-data-table>
      </v-col>

      <v-slide-x-reverse-transition hide-on-leave>
        <v-col
          class="mt-8 col-md-2"
          cols="1"
          v-show="showJudge"
        >
          <v-sheet class="red lighten-4 rounded-lg" rounded
          fixed
          style="position:sticky; top:80px;"
          >
            <div class="pa-4 text-center">

              <p class="mb-4">
                Your Judging Scores
              </p>

              <v-row v-for="(item, index) in judgeScores" :key="index" class="ma-2">
                <v-text-field
                  v-model="judgeScores[index]"
                  :label="data.scoringRubrics.labels[index] + ' (' + data.scoringRubrics.weights[index] + '%)'"
                ></v-text-field>
              </v-row>



              <v-btn @click.prevent="scoreSubmission" color="success">Submit Score</v-btn>
            </div>
          </v-sheet>
        </v-col>
      </v-slide-x-reverse-transition>
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
        scoreSheets: [],
        roles: null,

        showJudge: false,
        judgeScores: [],
    }),

    computed: {
      headers () {
        const h = [
          {
            text: 'Judge',
            align: 'start',
            value: 'judge',
          },
          { text: 'Score Date', value: 'scoreDate' },
          { text: 'Weighted Score', value: 'weightedScore' },
        ];

        for (let i=0; i<this.data.scoringRubrics.labels.length; i++) {
          h.push({
            text: `${this.data.scoringRubrics.labels[i]} (${this.data.scoringRubrics.weights[i]}%)`,
            value: `score${i}`
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
              this.submissionId = this.$route.params.submissionId;
              this.contract = await this.$moralis.getContract('Competition', this.address);
              console.log('contract', this.contract);

              this.showJudge = false;
              this.data = await this.contract.fetchAllPlainData();
              this.roles = await this.contract.methods.getRoles(this.$moralis.User.current().attributes.ethAddress).call();
              
              if (this.roles.isJudge) {
                const judgeScoreSheet = await this.contract.methods.getSubmissionScoreSheetByJudge(
                  this.submissionId, this.$moralis.User.current().attributes.ethAddress).call();
                  
                let judgeScores = judgeScoreSheet.scores;
                if (judgeScores.length != this.data.scoringRubrics.labels.length) {
                  judgeScores = [];
                  judgeScores.length = this.data.scoringRubrics.labels.length;
                }
                this.judgeScores = judgeScores;
              }

              this.submissionData = await this.contract.methods.submissions(this.submissionId).call();

              const allScoreSheets = await this.contract.methods.getSubmissionScoreSheets(this.submissionId).call();
              const scoreSheets = [];
              for (let i=0; i<allScoreSheets.length; i++) {
                const raw = allScoreSheets[i];
                const sheet = {
                  judge: raw.judge,
                  scoreDate: new Date(parseInt(raw.scoreDate) * 1000),
                  weightedScore: raw.weightedScore,
                };
                for (let j=0; j<raw.scores.length; j++)
                  sheet[`score${j}`] = raw.scores[j];

                scoreSheets.push(sheet);
              }

              this.scoreSheets = scoreSheets;
              console.log('submission data', this.data, this.submissionData, allScoreSheets, this.scoreSheets);
            } catch (e) {
                console.log(e);
            }
        },

        async scoreSubmission() {
            try {
                const receipt = await this.contract.methods
                    .scoreSubmission(this.submissionId, this.judgeScores)
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
