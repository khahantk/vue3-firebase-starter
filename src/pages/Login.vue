<template>
  <div class="flex items-center justify-center">
    <div class="w-full space-y-8">
      <h1>Log In</h1>
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
            <div v-if="vv.username.minLength.$invalid">
              Username should be at least 3 characters
            </div>
            <div v-if="vv.username.alphaNum.$invalid">
              Username only contains letters and numbers
            </div>
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
        <div><router-link to="/forgot">Forgot password?</router-link></div>
        <div class="flex justify-start">
          <button
            @click="login"
            title="Sign In"
            :disabled="isDisabled || loading"
            :loading="loading"
            class="rounded px-10 py-4 bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 border-2 border-gray-400"
            :class="isDisabled ? 'border-gray-200 text-gray-500' : ''"
          >
            Sign In
          </button>
        </div>
        <div>
          By clicking Sign In, you agree to our
          <router-link to="/terms" class="font-bold"
            >Terms of Service</router-link
          >
          and
          <router-link to="/privacy" class="font-bold"
            >Privacy Policy</router-link
          >
        </div>
        <div>
          <span>New to Demo? </span>
          <router-link to="/signup" class="underline"
            >Create your account</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength, alphaNum } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useRouter } from "vue-router";
import useAuth from "@/composables/auth";

export default {
  name: "Login",
  components: {},
  setup() {
    const router = useRouter();
    const loading = ref(false);
    const message = ref({ type: "", message: "" });
    const auth = useAuth();
    const user = reactive({
      username: "",
      password: "",
    });
    const rules = {
      username: {
        required,
        alphaNum,
        minLength: minLength(3),
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
    const login = async () => {
      try {
        vv.value.$touch();
        if (vv.value.$invalid) {
          return;
        }
        if (loading.value) {
          return;
        }
        message.value = {};
        loading.value = true;
        await auth.login(user.username, user.password);
        loading.value = false;
        user.value = {
          username: "",
          password: "",
        };
        router.push("/");
      } catch (error) {
        loading.value = false;
        message.value = {
          type: "error",
          message: "Not recognized or incorrect.",
        };
        console.log(error);
      }
    };

    return {
      loading,
      message,
      user,
      isDisabled,
      vv,
      login,
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
