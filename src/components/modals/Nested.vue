<template>
  <v-modal>
    <Content :title="title" :rows="rows" />

    <button class="button" type="button" @click="open">
      open nested modal
    </button>

    <v-modal-close />
  </v-modal>
</template>

<script>
import Content from '@/components/helpers/Content.vue';

export default {
  components: {
    Content,
  },
  props: {
    title: {
      type: String,
      default: 'Nested modal',
    },
    rows: {
      type: [String, Number],
      default: 1,
    },
  },
  methods: {
    open() {
      this.$modal.open('modals/Nested');
    },
  },
};
</script>
