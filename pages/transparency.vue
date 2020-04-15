<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" offset-sm="1" md="8" offset-md="2">
        <h1 class="text-center">A friendly crew, nothing to hide!</h1>
        <p class="text-center">
          Good privacy starts with trust. Therefore, we want to be as
          transparent as possible about our finances and how we handle your
          data.
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-text>
            <v-row align="center">
              <v-col cols="12" lg="3">
                <h2>Finance</h2>
                <p>
                  The purpose of Harbor is to build a nice platform for the
                  community, not to earn money. We aim to keep the platform free
                  and ad-free. Therefore, we want to show you exactly which
                  costs we have to deal with and how they are getting paid.
                </p>
                <p>
                  Currently, all costs are covered by personal contributions. To
                  keep a stable situation, we might introduce paid features in
                  the future. These features will always be an extension to the
                  current features. We commit ourselves, to never change an
                  existing feature to a paid feature.
                </p>
              </v-col>

              <v-col cols="12" sm="6" lg="4">
                <h3>Costs</h3>
                <div>
                  <canvas ref="chart-costs" class="chart"></canvas>
                </div>
                <ul class="mt-3">
                  <li>
                    <b>Infra:</b> Servers, domain names, storage, &hellip; the
                    geeky stuff
                  </li>
                </ul>
              </v-col>

              <v-col cols="12" sm="6" lg="4" offset-lg="1">
                <h3>Incomes</h3>
                <div>
                  <canvas ref="chart-incomes" class="chart"></canvas>
                </div>
                <ul class="mt-3">
                  <li>
                    <b>Personal contribution:</b> If the costs are higher than
                    the incomes, Harbor contributors are donating the
                    difference.
                  </li>
                </ul>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <v-row align="center">
              <v-col cols="12" sm="6" order-sm="last">
                <h2>Data locations</h2>
                <p>
                  The location of your data is important. This is one of the
                  factors which determines which laws are applicable to them. As
                  all our servers are located in Europe, your data is protected
                  by the
                  <a
                    href="https://en.wikipedia.org/wiki/General_Data_Protection_Regulation"
                    target="_blank"
                  >
                    GDPR</a
                  >.
                </p>
                <p>
                  For an in-depth explanation about which data we process and
                  how we use it, please check our
                  <a href="/privacy" target="_blank"> Privacy Policy</a>.
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <div>
                  <canvas ref="chart-data-map" class="chart"></canvas>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-text>
            <v-row align="center">
              <v-col cols="12" sm="6" order-sm="last">
                <h2>Active users</h2>
                <p>
                  Currently we have <b>{{ activeUsers.now }}</b> active users.
                  We consider users as active, if their last login is less than
                  one month ago.
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <div>
                  <canvas ref="chart-active-users" class="chart"></canvas>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint no-unused-vars: "off" */

import Chart from 'chart.js'
import { topojson } from 'chartjs-chart-geo'
import europe from '../assets/europe.json'
const Color = require('color')

export default {
  auth: false,

  asyncData({ $axios, error }) {
    return $axios.$get('/stats/active-users/').then((data) => {
      return { activeUsers: data }
    })
  },

  mounted() {
    const costs = [
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

    const incomes = [
      {
        date: new Date(2020, 2, 3), // 03-03-2020
        amount: 5.93,
        category: 'Personal contribution',
      },
      {
        date: new Date(2020, 3, 3), // 03-04-2020
        amount: 5.93,
        category: 'Personal contribution',
      },
    ]

    const chartSettings = {
      type: 'bar',
      options: {
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
      },
    }

    const chartCosts = new Chart(this.$refs['chart-costs'], {
      data: this.convertToChartData(costs, '#D32F2FCC'),
      ...chartSettings,
    })
    chartCosts.canvas.parentNode.style.height = '350px'

    const chartIncomes = new Chart(this.$refs['chart-incomes'], {
      data: this.convertToChartData(incomes, '#8BC34ACC'),
      ...chartSettings,
    })
    chartIncomes.canvas.parentNode.style.height = '350px'

    // Geo Map
    const features = topojson.feature(
      europe,
      europe.objects.continent_Europe_subunits
    ).features

    // Reduce countries to "Zoom" map
    const limitedEurope = features.filter(
      (c) => !['Svalbard', 'Russia'].includes(c.properties.geounit)
    )

    const dataPercentage = {
      Germany: 100,
    }

    const colors = limitedEurope.map((c) => {
      // Get value
      const value = dataPercentage[c.properties.geounit]

      // Country has no value => Return default
      if (typeof value === 'undefined') {
        return 'rgba(255, 255, 255, 0.7)'
      }

      // Generate color
      return Color('#64B5F6')
        .alpha(0.5)
        .lighten((100 - value) / 100.0)
        .rgb()
        .toString()
    })

    const chartDataMap = new Chart(this.$refs['chart-data-map'], {
      type: 'choropleth',
      data: {
        labels: limitedEurope.map((d) => {
          const geoUnit = d.properties.geounit
          let value = dataPercentage[geoUnit]
          if (typeof value === 'undefined') value = 0
          return `${geoUnit}: ${value}%`
        }),
        datasets: [
          {
            label: 'Data location',
            outline: limitedEurope,
            backgroundColor: colors,
            data: limitedEurope.map((d) => ({
              feature: d,
              value:
                typeof dataPercentage[d.properties.geounit] !== 'undefined'
                  ? dataPercentage[d.properties.geounit]
                  : 0,
            })),
          },
        ],
      },
      options: {
        showOutline: true,
        showGraticule: false,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scale: {
          projection: 'mercator',
        },
        geo: {
          colorScale: {
            display: false,
          },
        },
      },
    })
    chartDataMap.canvas.parentNode.style.height = '350px'

    const activeUsersEntries = Object.entries(
      this.activeUsers.history
    ).sort((a, b) => a[0].localeCompare(b[0]))

    const chartActiveUsers = new Chart(this.$refs['chart-active-users'], {
      type: 'line',
      data: {
        labels: activeUsersEntries.map((entry) => {
          // Entry index 0 = key
          const parts = entry[0].split('-')
          return parts[1] + '.' + parts[0]
        }),
        datasets: [
          {
            label: 'Active users',
            backgroundColor: '#D32F2FCC',
            fill: true,
            // Entry index 1 = value
            data: activeUsersEntries.map((entry) => entry[1]),
          },
        ],
      },
      options: {
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
      },
    })
    chartActiveUsers.canvas.parentNode.style.height = '350px'
  },

  methods: {
    convertToChartData(data, color) {
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
            backgroundColor: color,
            // hoverBackgroundColor: color,
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

  head() {
    return { title: this.$t('Transparency') }
  },
}
</script>
