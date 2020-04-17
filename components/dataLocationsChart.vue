<script>
/*
Example of expected input:
{
    Belgium: 25,
    Germany: 75,
}
*/

import { topojson } from 'chartjs-chart-geo'
import { generateChart } from 'vue-chartjs'
import europe from '../assets/europe.json'
const Color = require('color')

const Choropleth = generateChart('choropleth', 'choropleth')

export default {
  extends: Choropleth,

  props: {
    dataLocationPct: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },

  computed: {
    europeFeatures() {
      // Reduce countries to "Zoom" map
      return topojson
        .feature(europe, europe.objects.continent_Europe_subunits)
        .features.filter(
          (c) => !['Svalbard', 'Russia'].includes(c.properties.geounit)
        )
    },

    colors() {
      return this.europeFeatures.map((c) => {
        // Get value
        const value = this.dataLocationPct[c.properties.geounit]

        // Country has no value => Return default
        if (typeof value === 'undefined') {
          return 'rgba(255, 255, 255, 0.7)'
        }

        // Generate color
        return Color(this.color)
          .alpha(1)
          .lighten((100 - value) / 400.0)
          .rgb()
          .toString()
      })
    },

    labels() {
      return this.europeFeatures.map((d) => {
        const geoUnit = d.properties.geounit
        let value = this.dataLocationPct[geoUnit]
        if (typeof value === 'undefined') value = 0
        return `${geoUnit}: ${value}%`
      })
    },

    data() {
      return this.europeFeatures.map((d) => ({
        feature: d,
        value:
          typeof this.dataLocationPct[d.properties.geounit] !== 'undefined'
            ? this.dataLocationPct[d.properties.geounit]
            : 0,
      }))
    },

    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Data location',
            outline: this.europeFeatures,
            backgroundColor: this.colors,
            data: this.data,
          },
        ],
      }
    },
  },

  mounted() {
    const chartOptions = {
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
    }

    this.renderChart(this.chartData, chartOptions)
  },
}
</script>
