<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            {{ $t('Settings') }}
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="newUser.display_name"
                :label="$t('Username')"
              />

              <v-text-field v-model="newUser.email" :label="$t('Email')" />

              <v-text-field
                v-model="newPassword"
                :append-icon="showNewPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showNewPass ? 'text' : 'password'"
                name="password"
                :label="$t('New') + ' ' + $t('Password').toLowerCase()"
                required
                @click:append="showNewPass = !showNewPass"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                name="password"
                :label="$t('Current') + ' ' + $t('Password').toLowerCase()"
                required
                @click:append="showPass = !showPass"
              ></v-text-field>

              <v-btn color="success" class="mt-5">{{ $t('Save') }}</v-btn>
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

  created() {
    this.newUser = { ...this.user }
  },

  head() {
    return { title: this.$t('Settings') }
  },
}
</script>
