<template>
    <v-row class="text-justify" justify="center">
      <v-col class="mt-8" cols="10">
        <h1 class="display-2 font-weight-bold mb-3">
          Competitions
        </h1>
      </v-col>

      <!-- <v-col class="mb-4">
          <v-btn color="success" @click.prevent="$router.push('/create')">Create</v-btn>
      </v-col> -->

      <v-col
        class="mb-5"
        cols="10"
      >
        <v-data-table v-if="data"
            :headers="headers"
            :items="data"
            item-key="name"
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
            <template v-slot:item.name="{ item }">
                <router-link :to="'/view/' + item.competitionAddress">
                    {{ item.name }}
                </router-link>
            </template>
        </v-data-table>
      </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'ListCompetitions',

    data: () => ({
        search: '',
        data: null
    }),

    computed: {
      headers () {
        return [
          {
            text: 'Name',
            align: 'start',
            value: 'name',
          },
          { text: 'Category', value: 'category' },
          { text: 'Info', value: 'info' },
        ]
      },
    },

    async created() {
        const Competition = this.$moralis.Object.extend("competitions");
        const query = new this.$moralis.Query(Competition);
        const results = await query.find();
        this.data = results.map((obj) => obj.attributes);
        console.log("data", results, this.data);
    },
}
</script>
