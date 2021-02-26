<template>
  <div class="flex items-center justify-center">
    <div class="w-full space-y-8">
      <h1>Change Password</h1>
      <form
        class="mt-8 space-y-6 max-w-sm"
        @submit="
          (event) => {
            event.preventDefault();
          }
        "
      >
        <Message :message="message" />
        <div>
          <label for="password">Current Password</label>
          <input
            id="password"
            type="password"
            v-model="vv.password.$model"
            @keyup.enter="login"
            class="rounded w-full py-3 bg-white px-4 border-2 border-gray-1 focus:outline-none focus:border-gray-1"
          />
          <div
            v-if="vv.password.$invalid && vv.password.$dirty"
            class="text-red-400 pt-2"
          >
            <div v-if="vv.password.required.$invalid">
              Please enter current password
            </div>
            <div v-if="vv.password.minLength.$invalid">
              Password should be at least 6 characters
            </div>
          </div>
        </div>
        <div>
          <label for="newPassword">New Password</label>
          <input
            id="newPassword"
            type="password"
            v-model="vv.newPassword.$model"
            @keyup.enter="submit"
            class="rounded w-full py-3 bg-white px-4 border-2 border-gray-1 focus:outline-none focus:border-gray-1"
          />
          <div
            v-if="vv.newPassword.$invalid && vv.newPassword.$dirty"
            class="text-red-400 pt-2"
          >
            <div v-if="vv.newPassword.required.$invalid">
              Please enter new password
            </div>
            <div v-if="vv.newPassword.minLength.$invalid">
              New password should be at least 6 characters
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
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "@vuelidate/validators";
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import useAuth from "@/composables/auth";
import Message from "@/components/Message";

export default {
  name: "ChangePassword",
  components: { Message },
  setup() {
    const loading = ref(false);
    const message = ref({ type: "", message: "" });
    const auth = useAuth();
    const form = reactive({
      password: "",
      newPassword: "",
    });
    const rules = {
      password: {
        required,
        minLength: minLength(6),
      },
      newPassword: {
        required,
        minLength: minLength(6),
      },
    };
    const vv = useVuelidate(rules, form);

    const isDisabled = computed(() => {
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
        await auth.updatePassword(form.password, form.newPassword);
        Object.assign(form, { password: "", newPassword: "" });
        message.value = {
          type: "success",
          message: "Updated successfully.",
        };
        setTimeout(() => {
          message.value = {};
        }, 1500);
      } catch (error) {
        const { code } = error;
        let errorMsg = "There is something wrong";
        if (code === "auth/wrong-password") {
          errorMsg = "Current password is not correct";
        }
        message.value = {
          type: "error",
          message: errorMsg,
        };
        console.log(error);
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
