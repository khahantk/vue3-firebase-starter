<template>
  <div class="flex items-center justify-center">
    <div class="w-full space-y-8">
      <h1>Create account</h1>
      <form
        class="mt-8 space-y-6 max-w-sm"
        @submit="
          (event) => {
            event.preventDefault();
          }
        "
      >
        <div>
          <label for="username">Email</label>
          <input
            id="username"
            type="text"
            v-model="vv.username.$model"
            @keyup.enter="login"
            class="rounded w-full py-3 bg-white px-4 border-2 border-gray-1 focus:outline-none focus:border-gray-1"
          />
          <div v-if="vv.username.$invalid" class="text-red-400 pt-2">
            <div v-if="vv.username.email.$invalid">
              Please enter a valid email address
            </div>
          </div>
          <div
            v-if="message && message.code && message.code == 'username'"
            class="text-red-400 pt-2"
          >
            {{ message.message }}
          </div>
        </div>
        <div>
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="vv.password.$model"
            @keyup.enter="login"
            class="rounded w-full py-3 bg-white px-4 border-2 border-gray-1 focus:outline-none focus:border-gray-1"
          />
        </div>
        <div
          class="text-red-400"
          v-if="message && message.code != 'username' && message.message"
        >
          {{ message.message }}
        </div>
        <div class="flex justify-start">
          <button
            @click="signup"
            title="Sign In"
            :disabled="isDisabled || loading"
            :loading="loading"
            class="rounded px-10 py-4 bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 border-2 border-gray-400"
            :class="isDisabled ? 'border-gray-200 text-gray-500' : ''"
          >
            Sign Up
          </button>
        </div>
        <div>
          By clicking Sign Up, you agree to our
          <router-link to="/terms" class="font-bold"
            >Terms of Service</router-link
          >
          and
          <router-link to="/privacy" class="font-bold"
            >Privacy Policy</router-link
          >
        </div>
        <div>
          <span>Already have an account? </span>
          <router-link to="/login" class="underline">Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, email } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "Signup",
  components: {},
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const message = ref({ type: "", message: "" });
    const store = useStore();
    const user = reactive({
      username: "",
      password: "",
    });
    const rules = {
      username: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    };
    const vv = useVuelidate(rules, user);

    const isDisabled = computed(() => {
      vv.value.$touch();
      return !!vv.value.$invalid;
    });
    const signup = async () => {
      try {
        vv.value.$touch();
        if (vv.value.$invalid || loading.value) {
          return;
        }
        message.value = {};
        loading.value = true;
        await store.dispatch("user/signup", user);
        user.value = {
          username: "",
          password: "",
        };
        router.push("/");
      } catch (error) {
        const { code } = error;
        if (code === "auth/email-already-in-use") {
          message.value = {
            type: "error",
            code: "username",
            message: "Taken",
          };
        }
        console.log(error);
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      message,
      user,
      isDisabled,
      vv,
      signup,
    };
  },
};
</script>

<style>
.password-input::-ms-reveal,
.password-input::-ms-clear {
  display: none;
}
</style>
