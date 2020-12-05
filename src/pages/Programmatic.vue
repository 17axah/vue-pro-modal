<template>
<div>
  <h1>programmatic modals</h1>

  <button class="button m-r-10" @click="openDefaultModal">
    default modal
  </button>

  <button class="button m-r-10" @click="openPersistentModal">
    persistent modal
  </button>

  <button class="button m-r-10" @click="openLoadingModal">
    loading modal
  </button>

  <button class="button m-r-10" @click="openContentModal">
    content modal
  </button>

  <button class="button m-r-10" @click="openFullscreenModal">
    fullscreen modal
  </button>

  <button class="button m-r-10" @click="openNestedModal">
    nested modal
  </button>
</div>
</template>

<script>
export default {
  methods: {
    openDefaultModal() {
      this.$modal.open('modals/Default');
    },
    openPersistentModal() {
      this.$modal.open('modals/Persistent');
    },
    openLoadingModal() {
      this.$modal.open('modals/Loading');
    },
    openContentModal() {
      this.$modal.open('modals/Content');
    },
    openFullscreenModal() {
      this.$modal.open('modals/Fullscreen');
    },
    openNestedModal() {
      this.$modal.open('modals/Nested');
    },
  },
};
</script>
