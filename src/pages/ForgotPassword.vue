<template>
  <div class="flex items-center justify-center">
    <div class="w-full space-y-8">
      <h1>Password recovery</h1>
      <div class="my-4">We will send you an email to reset your password</div>
      <form class="mt-8 space-y-6 max-w-sm" @submit.prevent>
        <Message :message="message" />
        <div>
          <label for="username">Email</label>
          <input
            id="username"
            type="text"
            v-model="vv.username.$model"
            @keyup.enter="submit"
            class="rounded w-full py-3 bg-white px-4 border-2 border-gray-1 focus:outline-none focus:border-gray-1"
          />
          <div v-if="vv.username.$invalid" class="text-red-400 pt-2">
            <div v-if="vv.username.email.$invalid">
              Please enter a valid email address
            </div>
          </div>
        </div>

        <div class="flex justify-start">
          <button
            @click="submit"
            title="Send"
            :disabled="isDisabled || loading"
            :loading="loading"
            class="rounded px-10 py-4 bg-white hover:bg-gray-100 focus:outline-none focus:bg-gray-100 border-2 border-gray-400"
            :class="isDisabled ? 'border-gray-200 text-gray-500' : ''"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import useAuth from "@/composables/auth";
import Message from "@/components/Message";
export default {
  name: "ForgotPassword",
  components: { Message },
  setup() {
    const loading = ref(false);
    const message = ref({ type: "", message: "" });
    const auth = useAuth();
    const form = reactive({
      username: "",
    });
    const rules = {
      username: {
        required,
        email,
      },
    };
    const vv = useVuelidate(rules, form);

    const isDisabled = computed(() => {
      vv.value.$touch();
      return !!vv.value.$invalid;
    });
    const submit = async () => {
      try {
        vv.value.$touch();
        if (vv.value.$invalid || loading.value) {
          return;
        }

        message.value = {};
        loading.value = true;
        await auth.sendPasswordResetEmail(form.username);
        form.username = "";
        message.value = {
          type: "success",
          message: "Sent successfully. Please check your email inbox",
        };
        setTimeout(() => {
          message.value = {};
        }, 1500);
      } catch (error) {
        const { code } = error;
        let txt = "There is something wrong";
        if (code == "auth/user-not-found") {
          txt = "Not recognized";
        }
        message.value = {
          type: "error",
          message: txt,
        };
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      message,
      isDisabled,
      vv,
      submit,
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
