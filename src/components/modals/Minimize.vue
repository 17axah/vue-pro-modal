<template>
  <v-modal :minimize.sync="minimize" :fullscreen.sync="fullscreen" v-slot="{ close }">
    <Content title="Minimize programmatic modal" />

    <button class="button" type="button" @click="minimize = !minimize">
      minimize
    </button>

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
      minimize: false,
      fullscreen: false,
    };
  },
};
</script>
