<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            Edit profile
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-combobox
                :items="genders"
                hide-selected
                persistent-hint
                label="Gender"
                hint="Choose one or feel free to enter whatever you like the most"
              ></v-combobox>

              <v-textarea
                v-model="newUser.bio"
                name="input-bio"
                :label="$t('Bio')"
              ></v-textarea>

              <v-btn color="success" type="submit" class="mt-5">{{
                $t('Save')
              }}</v-btn>
              <v-btn color="error" @click="cancelEdit" class="mt-5">{{
                $t('Cancel')
              }}</v-btn>
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
      newUser: {},
      newPassword: '',
      showNewPass: false,
      password: '',
      showPass: false,
      genders: ['Hetero', 'Homo', 'Bi'],
    }
  },

  computed: {
    ...mapState('auth', ['user']),
  },

  methods: {
    cancelEdit() {
      // If nothing changed
      this.$router.go(-1)
    },
  },

  created() {
    this.newUser = { ...this.user }
  },

  head() {
    return { title: 'Edit profile' }
  },
}
</script>
