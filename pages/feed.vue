<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-timeline dense>
          <v-timeline-item v-for="n in 4" :key="n" large>
            <template v-slot:icon>
              <v-avatar>
                <img src="http://i.pravatar.cc/64" />
              </v-avatar>
            </template>
            <v-card class="elevation-2">
              <v-card-title class="headline">Lorem ipsum</v-card-title>
              <v-card-text
                >Lorem ipsum dolor sit amet, no nam oblique veritus. Commune
                scaevola imperdiet nec ut, sed euismod convenire principes at.
                Est et nobis iisque percipit, an vim zril disputando
                voluptatibus, vix an salutandi sententiae.</v-card-text
              >
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head() {
    return { title: 'Feed' }
  },
}
</script>
