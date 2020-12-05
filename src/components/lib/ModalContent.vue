<template>
  <div class="modal-content">
    <div class="modal-content__wrapper" :style="contentStyles">
      <header v-if="$scopedSlots.header" class="modal-content__header">
        <slot name="header" />
      </header>
      <div class="modal-content__body">
        <slot name="body" />
      </div>
      <footer v-if="$scopedSlots.footer" class="modal-content__footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  inject: {
    $modalProps: {
      default: () => ({}),
    },
  },
  props: {
    maxHeight: {
      type: String,
      default() {
        return this.$modalProps.maxHeight || '100vh';
      },
    },
  },
  computed: {
    contentStyles() {
      return {
        maxHeight: this.maxHeight,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.modal-content
  display: flex

  &__wrapper
    width: 100%
    display: flex
    flex-direction: column

  &__header,
  &__body,
  &__footer
    padding: 10px

  &__body
    max-height: 100%
    overflow: auto
</style>
