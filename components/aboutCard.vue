<template>
  <v-card>
    <v-card-text>
      <v-row align="center">
        <v-col
          cols="12"
          sm="3"
          class="text-center"
          :class="{ 'hidden-sm-and-up': alternate }"
        >
          <v-icon size="80px">{{ icon }}</v-icon>
        </v-col>
        <v-col cols="12" sm="9">
          <h2>{{ title }}</h2>
          <p v-for="(text, index) in texts" :key="index" v-html="text"></p>
        </v-col>
        <v-col v-if="alternate" sm="3" class="hidden-xs-only text-center">
          <v-icon size="100px">{{ icon }}</v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    texts: {
      type: Array,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    alternate: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
