<template>
  <v-card>
    <v-card-text>
      <div>
        <apexchart
          :type="type"
          width="550"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },

  data: function () {
    return {
      type: "line",
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            "Januari",
            "Februari",
            "Maret",
            "Maret",
            "April",
            "Mei",
            "Juni",
          ],
        },
      },
      series: [
        {
          name: "series-1",
          data: [
            251437000, 469456000, 754631000, 444912000, 159987000, 387547000,
          ],
        },
      ],
    };
  },

  methods: {},
};
</script>
