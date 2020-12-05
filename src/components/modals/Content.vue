<template>
  <v-modal no-padding>
    <v-modal-content>
      <template #header>
        <div class="flex ai-center jc-between">
          <strong>
            Content modal
          </strong>
          <v-modal-close />
        </div>
      </template>
      <template #body>
        <Content :title="false" :rows="rowsContent" />
      </template>
      <template #footer>
        <button class="button accent m-r-20" type="button" @click="rowsContent++">
          add content
        </button>
        <button class="button accent" type="button" @click="rowsContent = 1">
          reset content
        </button>
      </template>
    </v-modal-content>
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
      rowsContent: 1,
    };
  },
};
</script>
