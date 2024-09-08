<template>
  <v-container id="contain">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" md="10" lg="12">
        <v-card>
          <v-card-title>
            <span class="headline">{{ $t("login.title") }}</span>
          </v-card-title>
          <v-card-subtitle class="custom-subtitle">
            <v-form @submit.prevent="submitForm">
              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.email]"
                :label="$t('login.email')"
                type="email"
                required
                outlined
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="[rules.required, rules.minLength]"
                :label="$t('login.password')"
                type="password"
                required
                outlined
              ></v-text-field>

              <v-checkbox
                v-model="rememberMe"
                color="primary"
                :label="$t('login.rememberMe')"
              ></v-checkbox>

              <v-btn block color="primary" size="large" type="submit">
                {{ $t("login.submit") }}
              </v-btn>
              <v-alert v-if="errorMessage" type="error" dismissible>
                {{ errorMessage }}
              </v-alert>
              <v-btn class="mb-5" block size="large" @click="forgotPassword">{{
                $t("login.forgotPassword")
              }}</v-btn>
            </v-form>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// Form state
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const errorMessage = ref("");

// Validation rules
const rules = {
  required: (value: string) => !!value || "This field is required",
  email: (value: string) => /.+@.+\..+/.test(value) || "Email must be valid",
  minLength: (value: string) =>
    value.length >= 6 || "Password must be at least 6 characters long",
};

// i18n
const { t } = useI18n();

// Vue Router
const router = useRouter();

// Vuex Store
const store = useStore();

// Submit Form
async function submitForm() {
  if (email.value && password.value) {
    try {
      // Call API
      const call = await store.dispatch("login", {
        email: email.value,
        password: password.value,
      });

      // Handle remember me
      if (rememberMe.value) {
        localStorage.setItem(
          "loginData",
          JSON.stringify({ email: email.value, password: password.value })
        );
      } else {
        localStorage.removeItem("loginData");
      }
      if (call) {
        // Redirect to dashboard
        router.push("/admin/dashboard");
        // router.push("/dashboard");
      }
    } catch (error: any) {
      errorMessage.value = error.message || "An error occurred";
    }
  }
}

// Forgot Password
function forgotPassword() {
  // Implement forgot password logic here
}
</script>

<style lang="scss" scoped>
.v-card {
  max-width: 500px; /* Increase card width */
  margin: auto;
}

.custom-subtitle {
  color: #000000;
  opacity: 1;
}
#contain {
//   height: 100vh;
//   transform: translateY(15%);
}

:deep(.v-card-subtitle) {
  opacity: 1 !important;
}

.v-text-field,
.v-checkbox {
  margin-bottom: 1rem;
}

.v-btn {
  margin-top: 1rem;
}
</style>
