<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" offset-sm="1" md="8" offset-md="2">
        <h1 class="text-center">Welcome to the pirate side!</h1>
        <p class="text-center">
          Platforms like
          <a href="https://fetlife.com" target="_blank">FetLife</a>
          and
          <a href="https://www.bdsmzaken.nl/" target="_blank">BDSMzaken</a>
          are really nice. But what if it could be even better?
        </p>
        <aboutCard
          v-for="(item, index) in items"
          :key="item.icon"
          :title="item.title"
          :icon="item.icon"
          :texts="item.texts"
          :alternate="index % 2 === 0"
          class="mt-5"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import aboutCard from '../components/aboutCard'

export default {
  auth: false,

  components: {
    aboutCard,
  },

  data() {
    return {
      items: [
        {
          title: 'Privacy controls',
          icon: 'mdi-domino-mask',
          texts: [
            `
          At Harbor, out top priority is privacy, your privacy.
          We believe that your posts, photo&apos;s, profile information, &hellip; everything
          you do at Harbor, belongs to you. Therefore, it should be your decision
          how much you want to share.`,
            `
          To make this possible, we added finegrained privacy controls. These allow
          you to choose who can see what. For example, you want to show your age
          to friends, but hide it for strangers? Or share a photo album with only
          a select group of people? No problem!
          `,
          ],
        },
        {
          title: 'Transparency',
          icon: 'mdi-magnify',
          texts: [
            `
          Good privacy, starts by making sure you can trust the organization which 
          handles your data. We believe trust starts with honesty and transparency.
          Therefore, we created our
          <a href="/transparency" target="_blank">Transparency page</a>.`,
            `
          This page gives a clear overview about our expenses, how we earn money,
          where your data is stored, current user count, &hellip;
          `,
          ],
        },
        {
          title: 'Karma and Verified profiles',
          icon: 'mdi-account-check',
          texts: [
            `
          We strive to give you a safe online environment to explore, stay in touch,
          meet new people, &hellip;`,
            `
          To make this possible, in a privacy friendly way,
          we introduced a Karma based system and created multiple ways to verify your profile.
          Based on those 2 systems, you&apos;ll unlock different ways to interact with Harbor.
          `,
          ],
        },
        {
          title: 'Open source',
          icon: 'mdi-account-multiple-plus',
          texts: [
            `
          This platform is built by the community, for the community. You want
          to know how it works? Just have a look at
          <a href="https://github.com/KinkyHarbor" target="_blank">our organisation on GitHub</a>.
          The code of the project is freely available. This way, anybody can check our code
          and even propose improvements and new features.
          `,
          ],
        },
      ],
    }
  },

  head() {
    return { title: this.$t('About') }
  },
}
</script>
