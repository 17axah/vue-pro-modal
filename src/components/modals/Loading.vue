<template>
  <v-modal :loading="loading">
    <Content title="Loading programmatic modal" />
  </v-modal>
</template>

<script>
import Content from '@/components/helpers/Content.vue';

export default {
  components: {
    Content,
  },
  data() {
    return {
      loading: false,
    };
  },
  created() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
};
</script>
