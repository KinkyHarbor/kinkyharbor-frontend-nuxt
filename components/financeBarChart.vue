<script>
/*
Example of expected input:
[
    {
        date: new Date(2020, 2, 3), // 03-03-2020
        amount: 5.93,
        category: 'Infra',
    },
    {
        date: new Date(2020, 3, 3), // 03-04-2020
        amount: 5.93,
        category: 'Infra',
    },
]
*/

import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,

  props: {
    financeData: {
      type: Array,
      required: true,
    },
    colors: {
      type: Object,
      required: true,
    },
  },

  computed: {
    chartData() {
      return this.convertToChartData(this.financeData, this.colors)
    },
  },

  mounted() {
    const chartOptions = {
      maintainAspectRatio: false,
      tooltips: {
        mode: 'x',
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
            scaleLabel: {
              display: true,
              labelString: 'Amount in EURO',
            },
          },
        ],
      },
    }

    this.renderChart(this.chartData, chartOptions)
  },

  methods: {
    convertToChartData(data, colors) {
      // Init vars
      const labels = data.map((item) => this.formatDate(item.date))
      const chartData = {
        labels: [...new Set(labels)],
        datasets: [],
      }

      for (const item of data) {
        const labelIndex = chartData.labels.indexOf(this.formatDate(item.date))
        const dataIndex = chartData.datasets.findIndex(
          (set) => set.label === item.category
        )

        if (dataIndex < 0) {
          // Dataset not yet defined
          const dataset = {
            label: item.category,
            backgroundColor: colors[item.category],
            maxBarThickness: 50,
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
}
</script>
