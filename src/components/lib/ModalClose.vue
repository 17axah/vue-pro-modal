<template>
  <component
    :is="tag"
    v-bind="$attrs"
    type="button"
    class="modal-close"
    @click="$close"
  >
    <slot>
      <IconClose class="modal-close__icon" />
    </slot>
  </component>
</template>

<script>
import IconClose from './icons/Close.vue';

export default {
  components: {
    IconClose,
  },
  inject: {
    $close: {
      default: () => {},
    },
  },
  props: {
    tag: {
      type: String,
      default: 'button',
    },
  },
};
</script>

<style lang="sass" scoped>
.modal-close
  padding: 5px
  background: none
  border: none
  outline: none
  cursor: pointer
  transition: color 0.2s

  &:hover
    color: grey

  &__icon
    display: block
</style>
