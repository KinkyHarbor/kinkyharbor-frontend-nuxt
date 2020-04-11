<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-center">
          <v-icon size="100px">mdi-anchor</v-icon>
        </div>
        <v-card>
          <v-card-title class="headline">
            {{ this.$t('Transparency') }}
          </v-card-title>
          <v-card-text>
            <p>&hellip;</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="text-center">
            Costs vs income
          </v-card-title>
          <v-card-text>
            <canvas ref="chart-cost-income" class="chart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint no-unused-vars: "off" */

import Chart from 'chart.js'

export default {
  auth: false,

  mounted() {
    const costsAndIncomes = [
      {
        date: new Date(2020, 2, 3), // 03-03-2020
        amount: 5.93,
        type: 'Cost',
        category: 'Infra',
      },
      {
        date: new Date(2020, 2, 3), // 03-03-2020
        amount: 5.93,
        type: 'Income',
        category: 'Personal contribution',
      },
      {
        date: new Date(2020, 3, 3), // 03-04-2020
        amount: 5.93,
        type: 'Cost',
        category: 'Infra',
      },
      {
        date: new Date(2020, 3, 3), // 03-04-2020
        amount: 5.93,
        type: 'Income',
        category: 'Personal contribution',
      },
    ]

    const chartCostIncome = new Chart(this.$refs['chart-cost-income'], {
      type: 'bar',
      data: this.convertToChartData(costsAndIncomes),
      options: {
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    })
    chartCostIncome.canvas.parentNode.style.height = '400px'
    chartCostIncome.canvas.parentNode.style.width = '100%'
  },

  methods: {
    convertToChartData(data) {
      // Init vars
      const labels = data.map((item) => this.formatDate(item.date))
      const chartData = {
        labels: [...new Set(labels)],
        datasets: [],
      }

      for (const item of data) {
        const labelIndex = chartData.labels.indexOf(this.formatDate(item.date))
        const dataIndex = chartData.datasets.findIndex(
          (set) => set.label === item.category && set.stack === item.type
        )

        if (dataIndex < 0) {
          // Dataset not yet defined
          let color = ''
          if (item.type === 'Income') {
            color = 'rgba(149,221,133,0.5)'
          } else {
            color = 'rgba(239,53,16,0.5)'
          }

          const dataset = {
            label: item.category,
            stack: item.type,
            backgroundColor: color,
            data: Array(chartData.labels.length).fill(0),
          }

          dataset.data[labelIndex] += item.amount
          chartData.datasets.push(dataset)
        } else {
          // Dataset exists
          chartData.datasets[dataIndex].data[labelIndex] += item.amount
        }
      }
      return chartData
    },

    formatDate(date) {
      let month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      return month + '.' + date.getFullYear()
    },
  },

  head() {
    return { title: this.$t('Transparency') }
  },
}
</script>
