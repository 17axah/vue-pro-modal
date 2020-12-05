<template>
<div>
  <h1>v-model modals</h1>

  <button class="button m-r-10" @click="modals.default = true">
    default modal
  </button>

  <button class="button m-r-10" @click="modals.persistent = true">
    persistent modal
  </button>

  <button class="button m-r-10" @click="openLoadingModal">
    loading modal
  </button>

  <button class="button m-r-10" @click="modals.content = true">
    content modal
  </button>

  <button class="button m-r-10" @click="modals.fullscreen = true">
    fullscreen modal
  </button>

  <button class="button m-r-10" @click="modals.nested = true">
    nested modal
  </button>

  <v-modal v-model="modals.default">
    <Content title="Default modal" />
  </v-modal>

  <v-modal v-model="modals.persistent" persistent v-slot="{ close }">
    <div class="flex ai-center jc-between">
      <h2 class="m-a-0">
        Persistent modal
      </h2>
      <v-modal-close />
    </div>
    <Content :title="false" />

    <div class="text-right">
      <button class="button" @click="close">
        close
      </button>
    </div>
  </v-modal>

  <v-modal v-model="modals.loading" :loading="loading">
    <Content title="Loading modal" />
  </v-modal>

  <v-modal v-model="modals.fullscreen" fullscreen v-slot="{ close }">
    <Content title="Fullscreen modal" />
    <button class="button" @click="close">
      close
    </button>
  </v-modal>

  <v-modal v-model="modals.content" no-padding>
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
        <button class="button accent m-r-20" @click="rowsContent++">
          add content
        </button>
        <button class="button accent" @click="rowsContent = 1">
          reset content
        </button>
      </template>
    </v-modal-content>
  </v-modal>

  <v-modal v-model="modals.nested">
    <Content title="Nested modal 1" />

    <v-modal-close />

    <button class="button accent" @click="modals.nested2 = true">
      open nested modal 2
    </button>

    <v-modal v-model="modals.nested2" width="500px">
      <Content title="Nested modal 2" />

      <v-modal-close />

      <button class="button accent" @click="modals.nested3 = true">
        open nested modal 3
      </button>

      <v-modal v-model="modals.nested3">
        <v-modal-close />

        <Content title="Nested modal 3" />
      </v-modal>
    </v-modal>
  </v-modal>
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
      loading: false,
      rowsContent: 1,
      modals: {
        default: false,
        persistent: false,
        loading: false,
        content: false,
        fullscreen: false,
        nested: false,
        nested2: false,
        nested3: false,
      },
    };
  },
  methods: {
    openLoadingModal() {
      this.loading = true;

      this.modals.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
};
</script>
