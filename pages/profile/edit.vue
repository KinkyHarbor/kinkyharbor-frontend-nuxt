<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Edit profile
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="updateUser">
              <v-combobox
                v-model="newGender"
                :items="genders"
                hide-selected
                persistent-hint
                label="Gender"
                hint="Choose one or feel free to enter whatever you like the most"
                @update:search-input="updateGender"
              ></v-combobox>

              <v-textarea
                v-model="newBio"
                name="input-bio"
                :label="$t('Bio')"
                class="mt-5"
              ></v-textarea>

              <v-btn color="success" type="submit" class="mt-5">{{
                $t('Save')
              }}</v-btn>
              <v-btn color="error" class="mt-5" @click="cancelEdit">
                {{ $t('Cancel') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      newBio: '',
      genders: ['Hetero', 'Homo', 'Bi'],
      newGender: '',
    }
  },

  computed: {
    ...mapState('auth', ['user']),
  },

  created() {
    this.newBio = this.user.bio
    this.newGender = this.user.gender
  },

  methods: {
    updateGender(newValue) {
      // v-model is too lazy, force update
      this.newGender = newValue
    },

    updateUser() {
      this.$axios
        .$patch('/users/me/', {
          bio: this.newBio,
          gender: this.newGender,
        })
        .then((data) => {
          return this.$auth.fetchUser()
        })
        .then((_) => {
          this.$router.push(this.localePath('/profile/me'))
        })
        .catch((e) => console.log(e))
    },

    cancelEdit() {
      // If nothing changed
      this.$router.go(-1)
    },
  },

  head() {
    return { title: 'Edit profile' }
  },
}
</script>
