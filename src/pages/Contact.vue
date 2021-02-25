<template>
  <div class="flex items-center justify-center">
    <div class="w-full space-y-8">
      <h1>Contact us</h1>
      <form
        class="mt-8 space-y-6 max-w-sm"
        @submit="
          (event) => {
            event.preventDefault();
          }
        "
      >
        <div>
          <label for="email">Name</label>
          <input
            id="name"
            type="text"
            v-model="vv.name.$model"
            class="rounded w-full py-3 bg-white px-4 border-2 border-gray-1 focus:outline-none focus:border-gray-1"
          />
          <div v-if="vv.name.$invalid" class="text-red-400 pt-2">
            <div v-if="vv.name.minLength.$invalid">
              Name should be at least 3 characters
            </div>
          </div>
        </div>
        <div>
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="vv.email.$model"
            class="rounded w-full py-3 bg-white px-4 border-2 border-gray-1 focus:outline-none focus:border-gray-1"
          />
          <div v-if="vv.email.$invalid" class="text-red-400 pt-2">
            <div v-if="vv.email.minLength.$invalid">
              email should be at least 3 characters
            </div>
          </div>
        </div>
        <div>
          <label for="email">Message</label>
          <textarea
            v-model="vv.message.$model"
            class="rounded w-full py-3 bg-white px-4 border-2 border-gray-1 focus:outline-none focus:border-gray-1"
          ></textarea>
          <div v-if="vv.message.$invalid" class="text-red-400 pt-2">
            <div v-if="vv.message.minLength.$invalid">
              Please enter your message
            </div>
          </div>
        </div>
        <div class="flex justify-start">
          <button
            @click="submit"
            title="Submit"
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
export default {
  setup() {
    const loading = ref(false);
    const message = ref({ type: "", message: "" });
    const form = reactive({
      name: "",
      email: "",
      message: "",
    });
    const rules = {
      name: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        minLength: minLength(6),
      },
      message: {
        required,
        minLength: minLength(6),
      },
    };
    const vv = useVuelidate(rules, form);

    const isDisabled = computed(() => {
      vv.value.$touch();
      return !!vv.value.$invalid;
    });
    const submit = () => {};
    return {
      submit,
      vv,
      isDisabled,
      loading,
      message,
    };
  },
};
</script>