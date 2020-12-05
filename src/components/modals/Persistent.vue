<template>
  <v-modal persistent v-slot="{ close }">
    <Content title="Persistent programmatic modal" />

    <div class="text-right">
      <button class="button" type="button" @click="close">
        close
      </button>
    </div>
  </v-modal>
</template>

<script>
import Content from '@/components/helpers/Content.vue';

export default {
  components: {
    Content,
  },
};
</script>
