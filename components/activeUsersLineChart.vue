<script>
/*
Example of expected input:
[
    {
        yearMonth: "2020-03-01"
        count: 30,
    },
    {
        yearMonth: "2020-04-01"
        count: 45,
    },
]
*/

import { Line } from 'vue-chartjs'

export default {
  extends: Line,

  props: {
    activeUsersData: {
      type: Array,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },

  computed: {
    labels() {
      return this.activeUsersData.map((entry) => {
        const [year, month] = entry.yearMonth.split('-')
        return `${month}.${year}`
      })
    },

    userCounts() {
      return this.activeUsersData.map((entry) => entry.count)
    },

    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Active users',
            backgroundColor: this.color,
            fill: true,
            data: this.userCounts,
          },
        ],
      }
    },
  },

  mounted() {
    const chartOptions = {
      title: {
        display: true,
        text: 'Average of active users per month',
      },
      maintainAspectRatio: false,
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month',
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              precision: 0,
            },
          },
        ],
      },
    }

    this.renderChart(this.chartData, chartOptions)
  },
}
</script>
