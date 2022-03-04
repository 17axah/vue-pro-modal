<template>
<div>
  <div>
    <a href="#" @click.prevent="content = !content">
      Add content to scroll the page
    </a>
  </div>

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

  <button class="button m-r-10" @click="openMinimizeModal">
    minimize modal
  </button>

  <Content v-if="content" :rows="20" />
</div>
</template>

<script>
import Content from '@/components/helpers/Content.vue';

export default {
  components: {
    Content,
  },
  data() {
    return {
      content: false,
    };
  },
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
    openMinimizeModal() {
      this.$modal.open('modals/Minimize');
    },
  },
};
</script>
