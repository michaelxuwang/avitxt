<template>
    <v-row class="text-justify" justify="center">
      <v-col class="mt-8" cols="10">
        <v-row justify="space-between">
          <v-col>
            <h1 class="display-2 font-weight-bold mb-3">
              Edit Competition
            </h1>
            Contract: {{address}}
          </v-col>
          <v-col>
            <p class="text-right">
              <v-btn color="primary" @click.prevent="$router.push('/view/' + address)">View</v-btn>
            </p>
            <p class="text-right">
              <v-btn color="secondary" @click.prevent="fetchExternalData" :disabled="txing">Fetch External Data</v-btn>
            </p>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
      >

        <v-tabs vertical>
          <v-tab>Info</v-tab>
          <v-tab>Requirements</v-tab>
          <v-tab>Judges</v-tab>
          <v-tab>Privacy</v-tab>
          <v-tab>Funds</v-tab>

          <v-tab-item>
            <!-- <v-text-field
                v-model="address"
                label="Contract Address"
                disabled
            ></v-text-field> -->
            
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

            <v-row>
              <v-col>
                <v-menu
                  v-model="openDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="openDate"
                      label="Open Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="openDate"
                    @input="openDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col>
                <v-menu
                  ref="openMenu"
                  v-model="openTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="openTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="openTime"
                      label="Open Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="openTimeMenu"
                    v-model="openTime"
                    full-width
                    @click:minute="$refs.openMenu.save(openTime)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-menu
                  v-model="closeDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="closeDate"
                      label="Close Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="closeDate"
                    @input="closeDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col>
                <v-menu
                  ref="closeMenu"
                  v-model="closeTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="closeTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="closeTime"
                      label="Close Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="closeTimeMenu"
                    v-model="closeTime"
                    full-width
                    @click:minute="$refs.closeMenu.save(closeTime)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-menu
                  v-model="finalizeDateMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="finalizeDate"
                      label="Finalize Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="finalizeDate"
                    @input="finalizeDateMenu = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col>
                <v-menu
                  ref="finalizeMenu"
                  v-model="finalizeTimeMenu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="finalizeTime"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="finalizeTime"
                      label="Finalize Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="finalizeTimeMenu"
                    v-model="finalizeTime"
                    full-width
                    @click:minute="$refs.finalizeMenu.save(finalizeTime)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-divider class="mt-8"></v-divider>
            <v-btn @click.prevent="setInfo" color="success mt-8" :disabled="txing">Save</v-btn>
            <v-progress-circular
              indeterminate
              color="primary"
              class="ml-2"
              v-show="txing"
            ></v-progress-circular>
          </v-tab-item>

          <v-tab-item>
            <v-textarea
              v-model="requirementsInfo"
              label="Submission Requirements"
            ></v-textarea>

            <v-col>
              <h3 class="mt-8 mb-8">
                Scoring Rubrics
              </h3>
              <v-row v-for="(item, index) in scoringRubrics" :key="index" class="">
                <v-col>
                  <v-text-field
                      v-model="item.label"
                      label="Name"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                      v-model="item.weight"
                      label="Weight (1 - 100%)"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-btn
                    icon
                    @click="scoringRubrics.splice(index, 1)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn
                small
                @click="scoringRubrics.push({})"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>

            <v-divider class="mt-8"></v-divider>

            <v-col>
              <h3 class="mt-8 mb-8">
                External Data Sources
              </h3>
              <v-row v-for="(item, index) in externalDataSources" :key="index" class="">
                <v-col>
                  <v-text-field
                      v-model="item.label"
                      label="Name"
                      :rules="nameRules"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                      v-model="item.url"
                      label="URL"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-btn
                    icon
                    @click="externalDataSources.splice(index, 1)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn
                small
                @click="externalDataSources.push({})"
              >
              <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>

            <v-divider class="mt-8 mb-8"></v-divider>
            <v-btn @click.prevent="setRequirements" color="success" :disabled="txing">Set Requirements</v-btn>
            <v-progress-circular
              indeterminate
              color="primary"
              class="ml-2"
              v-show="txing"
            ></v-progress-circular>
          </v-tab-item>

          <v-tab-item>
            <h3>Current Judges</h3>
            <div v-if="data" class="mt-8">
              <div v-for="(item, index) in data.judges" :key="index" class="mt-2">
                <v-icon>mdi-account-box</v-icon> {{ item }}
              </div>
            </div>

            <v-divider class="mt-8 mb-8"></v-divider>
            <v-text-field
                v-model="judge"
                label="New Judge Address"
            ></v-text-field>

            <v-btn @click.prevent="addJudge" color="success" :disabled="txing">Add Judge</v-btn>
            <v-progress-circular
              indeterminate
              color="primary"
              class="ml-2"
              v-show="txing"
            ></v-progress-circular>

          </v-tab-item>

          <v-tab-item>
            <v-select
              v-model="privacyId"
              :items="privacyOptions"
              label="Name & ID"
            ></v-select>

            <v-select
              v-model="privacySubmission"
              :items="privacyOptions"
              label="Submission"
            ></v-select>

            <v-select
              v-model="privacyScores"
              :items="privacyOptions"
              label="Scores"
            ></v-select>

            <v-select
              v-model="privacyRank"
              :items="privacyOptions"
              label="Rank"
            ></v-select>

            <v-checkbox
              v-model="applicantCanChoose"
              label="Allow applicant to choose more privacy-restrictive levels"
            ></v-checkbox>

            <v-btn @click.prevent="setPrivacy" color="success" :disabled="txing">Save</v-btn>
            <v-progress-circular
              indeterminate
              color="primary"
              class="ml-2"
              v-show="txing"
            ></v-progress-circular>
          </v-tab-item>

          <v-tab-item>
            <v-text-field
                v-model="submissionFee"
                label="Submission Fee"
            ></v-text-field>

            <v-btn @click.prevent="setSubmissionFee" color="success" :disabled="txing">Save</v-btn>
            <v-progress-circular
              indeterminate
              color="primary"
              class="ml-2"
              v-show="txing"
            ></v-progress-circular>

            <v-divider class="mt-8 mb-8"></v-divider>
            <p>
              Native Balance: {{ethBalance}}
            </p>
            <p>
              LINK Balance: {{linkBalance}}
            </p>
          </v-tab-item>
        </v-tabs>
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

        openDate: null,
        openDateMenu: false,
        openTime: null,
        openTimeMenu: false,

        closeDate: null,
        closeDateMenu: false,
        closeTime: null,
        closeTimeMenu: false,

        finalizeDate: null,
        finalizeDateMenu: false,
        finalizeTime: null,
        finalizeTimeMenu: false,

        requirementsInfo: '',
        scoringRubrics: [{}],
        externalDataSources: [{}],

        judge: '',

        privacyOptions: ["Public", "Organizer & Judges", "Organizer Only"],
        privacyId: 'Organizer Only',
        privacySubmission: 'Organizer & Judges',
        privacyScores: 'Public',
        privacyRank: 'Public',
        applicantCanChoose: true,

        submissionFee: null,
        ethBalance: 0,
        linkBalance: 0,

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
              
              this.data = await this.contract.fetchAllPlainData();
              console.log('data', this.contract, this.data);
              
              this.name = this.data.name;
              this.category = this.data.category;
              this.info = this.data.info;

              const openDateTime = (this.data.openDate != '0') ? new Date(parseInt(this.data.openDate) * 1000) : new Date();
              this.openDate = openDateTime.toISOString().substr(0, 10);
              this.openTime = openDateTime.toTimeString().substr(0, 5);
              const closeDateTime = (this.data.closeDate != '0') ? new Date(parseInt(this.data.closeDate) * 1000) : new Date();
              this.closeDate = closeDateTime.toISOString().substr(0, 10);
              this.closeTime = closeDateTime.toTimeString().substr(0, 5);
              const finalizeDateTime = (this.data.finalizeDate != '0') ? new Date(parseInt(this.data.finalizeDate) * 1000) : new Date();
              this.finalizeDate = finalizeDateTime.toISOString().substr(0, 10);
              this.finalizeTime = finalizeDateTime.toTimeString().substr(0, 5);

              this.requirementsInfo = this.data.requirementsInfo;
              
              // if (this.data.scoringRubrics.labels.length) {
                const newScoringRubrics = [];
                for (let i=0; i<this.data.scoringRubrics.labels.length; i++) {
                  newScoringRubrics.push({
                    label: this.data.scoringRubrics.labels[i],
                    weight: this.data.scoringRubrics.weights[i]
                  })
                }
                this.scoringRubrics = newScoringRubrics;
              // } else {
              //   this.scoringRubrics = [{}];
              // }

              // if (this.data.externalDataSources.labels.length) {
                const newExternalDataSources = [];
                for (let i=0; i<this.data.externalDataSources.labels.length; i++) {
                  newExternalDataSources.push({
                    label: this.data.externalDataSources.labels[i],
                    url: this.data.externalDataSources.urls[i]
                  })
                }
                this.externalDataSources = newExternalDataSources;
              // } else {
              //   this.externalDataSources = [{}];
              // }

              this.submissionFee = this.data.submissionFee;
              this.ethBalance = await this.$moralis.web3.eth.getBalance(this.address);
              this.linkBalance = await this.contract.getLinkBalance();

            } catch (e) {
                console.log(e);
                alert(e.message ? e.message : JSON.stringify(e));
            }
        },

        async setInfo() {
            this.txing = true;
            try {
                const receipt = await this.contract.methods.setInfo(
                  this.name, this.info, this.category,
                  Date.parse(this.openDate + ' ' + this.openTime) / 1000,
                  Date.parse(this.closeDate + ' ' + this.closeTime) / 1000,
                  Date.parse(this.finalizeDate + ' ' + this.finalizeTime) / 1000
                ).send({from: this.$store.state.userAddress});
                
                console.log('receipt', receipt);
                this.fetchData();
            } catch (e) {
                console.log(e);
                alert(e.message ? e.message : JSON.stringify(e));
            }
            this.txing = false;
        },

        async addJudge() {
            this.txing = true;
            try {
                const receipt = await this.contract.methods.addJudge(this.judge)
                    .send({
                      from: this.$store.state.userAddress,
                    });
                console.log('receipt', receipt);
                this.fetchData();
            } catch (e) {
                console.log(e);
                alert(e.message ? e.message : JSON.stringify(e));
            }
            this.txing = false;
        },

        async setRequirements() {
            this.txing = true;
            try {
                const receipt = await this.contract.methods
                    .setRequirements(
                      this.requirementsInfo,
                      this.scoringRubrics.map(x => x.label),
                      this.scoringRubrics.map(x => x.weight),
                      this.externalDataSources.map(x => x.label),
                      this.externalDataSources.map(x => x.url)
                    )
                    .send({
                      from: this.$store.state.userAddress,
                    });
                console.log('receipt', receipt);
                this.fetchData();
            } catch (e) {
                console.log(e);
                alert(e.message ? e.message : JSON.stringify(e));
            }
            this.txing = false;
        },

        async setPrivacy() {
          alert('Not implemented yet.');
        },

        async setSubmissionFee() {
            this.txing = true;
            try {
                const receipt = await this.contract.methods
                    .setSubmissionFee(this.submissionFee)
                    .send({
                      from: this.$store.state.userAddress,
                    });
                console.log('receipt', receipt);
                this.fetchData();
            } catch (e) {
                console.log(e);
                alert(e.message ? e.message : JSON.stringify(e));
            }
            this.txing = false;
        },

        async fetchExternalData() {
            this.txing = true;
            try {
                const receipt = await this.contract.methods
                    .fetchExternalData()
                    .send({
                      from: this.$store.state.userAddress,
                    });
                console.log('receipt', receipt);
                this.fetchData();
            } catch (e) {
                console.log(e);
                alert(e.message ? e.message : JSON.stringify(e));
            }
            this.txing = false;
        }
    },

    watch: {
      '$route': 'fetchData'
    }
}
</script>
