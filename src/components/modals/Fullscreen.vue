<template>
  <v-modal :fullscreen="fullscreen" v-slot="{ close }">
    <Content title="Fullscreen modal" />
    <button class="button" type="button" @click="fullscreen = !fullscreen">
      fullscreen
    </button>

    <button class="button" type="button" @click="close">
      close
    </button>
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
      fullscreen: false,
    };
  },
};
</script>
