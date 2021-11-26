<template>
    <v-row class="text-center" justify="center">
      <v-col class="mb-4">
          <br>
        <h1 class="display-2 font-weight-bold mb-3">
          Submissions <span v-if="data">for {{data.name}}</span>
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
            <template v-slot:item.submissionId="{ item }">
                <router-link :to="'/view/' + address + '/' + item.submissionId">
                    {{ item.submissionId }}
                </router-link>
            </template>
        </v-data-table>
      </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'ListSubmissions',

    data: () => ({
        address: null,
        contract: null,
        data: null,

        submissions: null,
        search: '',
    }),

    computed: {
      headers () {
        return [
          {
            text: 'Applicant',
            align: 'start',
            value: 'submissionId',
          },
          { text: 'Weighted Score', value: 'weightedScore' },
          { text: 'Submission Date', value: 'submissionDate' },
        ]
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
              console.log('contract', this.contract);
              this.data = await this.contract.fetchAllPlainData();

              const submissions = await Promise.all(this.data.applicants.map(x => this.contract.methods.submissions(x).call()));
              for (let i=0; i<this.data.applicants.length; i++) {
                submissions[i].submissionId = this.data.applicants[i];
              }
              this.submissions = submissions;
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
