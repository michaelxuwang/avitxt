<template>
    <v-row class="text-left" justify="center">
      <v-col class="mt-8" cols="10">
        <v-row>
          <v-col class="col-9">
            <h1 class="display-1 font-weight-bold mb-3">
              <v-icon x-large>mdi-account-box-outline</v-icon> {{address}}
            </h1>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="10"
        justify="left"
      >
        <h3>Applicant Stats</h3>
        <p>
        </p>
        <p>
          # of Competitions Entered: {{ parseInt(Math.random()*20) }}
        </p>
        <p>
          # of Competitions Won: {{ parseInt(Math.random()*4) }}
        </p>
        <p>
          Scoring Deviation: {{ parseInt(Math.random()*40)/10 }}
        </p>
        <p>
        </p>

        <v-divider class="mt-8 mb-8"></v-divider>

        <h3>Applicant Patterns and Trends</h3>
        <p>
            <v-sparkline
                :value="value"
                :gradient="gradient"
                :smooth="radius || false"
                :padding="padding"
                :line-width="width"
                :stroke-linecap="lineCap"
                :gradient-direction="gradientDirection"
                :fill="fill"
                :type="type"
                :auto-line-width="autoLineWidth"
                auto-draw
            ></v-sparkline>
        </p>

        <p>
            <v-sparkline
            :fill="g2.fill"
            :gradient="g2.selectedGradient"
            :line-width="g2.width"
            :padding="g2.padding"
            :smooth="g2.radius || false"
            :value="g2.value"
            auto-draw
            ></v-sparkline>
        </p>

      </v-col>
    </v-row>
</template>

<script>
const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
];

export default {
    name: 'ViewApplicant',

    data: () => ({
        address: null,

        width: 2,
        radius: 10,
        padding: 8,
        lineCap: 'round',
        gradient: gradients[5],
        value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
        gradientDirection: 'top',
        gradients,
        fill: false,
        type: 'trend',
        autoLineWidth: false,

        g2: {
            fill: true,
            selectedGradient: gradients[4],
            gradients,
            padding: 8,
            radius: 10,
            value: [ 8, 2, 9, 0, 5, 9, 5, 0, 3, 5, 0, 2, 10, 0, 1],
            width: 2,
        }
    }),

    created() {
      this.fetchData();
    },

    methods: {
        async fetchData () {
            try {
              this.address = this.$route.params.address;
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
