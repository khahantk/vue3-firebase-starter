<template>
  <div
    class="alert"
    :class="message.type == 'error' ? 'alert-error' : 'alert-success'"
    v-show="message && message.message"
    role="alert"
  >
    {{ message.message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>

<style>
.alert {
  @apply transition-all relative py-3 pl-4 pr-10 leading-normal rounded-lg;
}
.alert-error {
  @apply text-red-800 bg-red-100;
}
.alert-success {
  @apply text-green-700 bg-green-100;
}
</style>