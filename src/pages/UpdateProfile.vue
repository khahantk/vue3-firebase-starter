<template>
  <div class="flex items-center justify-center">
    <div class="w-full space-y-8">
      <h1>Personal Info</h1>
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
          <label for="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            v-model="vv.firstName.$model"
            @keyup.enter="login"
            class="rounded w-full py-3 bg-white px-4 border-2 border-gray-1 focus:outline-none focus:border-gray-1"
          />
          <div
            v-if="vv.firstName.$invalid && vv.firstName.$dirty"
            class="text-red-400 pt-2"
          >
            <div v-if="vv.firstName.required.$invalid">
              Please enter first name
            </div>
          </div>
        </div>
        <div>
          <label for="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            v-model="vv.lastName.$model"
            @keyup.enter="submit"
            class="rounded w-full py-3 bg-white px-4 border-2 border-gray-1 focus:outline-none focus:border-gray-1"
          />
          <div
            v-if="vv.lastName.$invalid && vv.lastName.$dirty"
            class="text-red-400 pt-2"
          >
            <div v-if="vv.lastName.required.$invalid">
              Please enter last name
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
import { required } from "@vuelidate/validators";
import { computed, onMounted, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import useAuth from "@/composables/auth";
import Message from "@/components/Message";
import { useStore } from "vuex";

export default {
  name: "Profile",
  components: { Message },
  setup() {
    const loading = ref(false);
    const message = ref({ type: "", message: "" });
    const auth = useAuth();
    const form = reactive({
      firstName: "",
      lastName: "",
    });
    const rules = {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
    };
    const vv = useVuelidate(rules, form);
    const store = useStore();
    const profile = ref({});
    const { getProfile } = useAuth();
    onMounted(async () => {
      const { uid: userId } = store.state.user.data;
      profile.value = await getProfile(userId);
      Object.assign(form, { ...profile.value });
    });

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
        await auth.saveProfile(store.state.user.data.uid, form);
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
        if (code === "auth/wrong-firstName") {
          errorMsg = "Current firstName is not correct";
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
.firstName-input::-ms-reveal,
.firstName-input::-ms-clear {
  display: none;
}
</style>
