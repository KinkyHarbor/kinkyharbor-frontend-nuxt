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
            <v-row>
              <v-col cols="12" lg="3" align-self="center">
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
                <finance-bar-chart
                  :colors="costColors"
                  :finance-data="costs"
                  :height="chartHeight"
                />
                <ul class="mt-3">
                  <li>
                    <b>Infra:</b> Servers, domain names, storage, &hellip; the
                    geeky stuff
                  </li>
                </ul>
              </v-col>

              <v-col cols="12" sm="6" lg="4" offset-lg="1">
                <h3>Incomes</h3>
                <finance-bar-chart
                  :colors="incomeColors"
                  :finance-data="incomes"
                  :height="chartHeight"
                />
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
                <data-locations-chart
                  :color="dataLocationColor"
                  :data-location-pct="dataLocationPercentages"
                  :height="chartHeight"
                />
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
                <active-users-line-chart
                  :color="activeUsersColor"
                  :active-users-data="activeUsersData"
                  :height="chartHeight"
                />
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
import activeUsersLineChart from '../components/activeUsersLineChart'
import dataLocationsChart from '../components/dataLocationsChart'
import financeBarChart from '../components/financeBarChart'

export default {
  auth: false,

  components: {
    activeUsersLineChart,
    dataLocationsChart,
    financeBarChart,
  },

  asyncData({ $axios, error }) {
    return $axios.$get('/stats/active-users/').then((data) => {
      return { activeUsers: data }
    })
  },

  data() {
    return {
      chartHeight: 350,
      costs: [
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
      ],
      costColors: {
        Infra: '#D32F2FCC',
      },

      incomes: [
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
      ],
      incomeColors: {
        'Personal contribution': '#8BC34ACC',
      },

      dataLocationPercentages: {
        Germany: 100,
      },
      dataLocationColor: '#64B5F6',

      activeUsersColor: '#D32F2FCC',
    }
  },

  computed: {
    activeUsersData() {
      // Converts object to array of objects
      return Object.entries(this.activeUsers.history)
        .map(([yearMonth, count]) => ({ yearMonth, count }))
        .sort((a, b) => a.yearMonth.localeCompare(b.yearMonth))
    },
  },

  head() {
    return { title: this.$t('Transparency') }
  },
}
</script>
