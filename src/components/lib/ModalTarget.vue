<template>
<div>
  <ModalTransition
    v-for="instance in instances"
    :key="instance.id"
    :name="instance.props.transition || transition"
    @before-enter="instance.eventBus.$emit('before-open')"
    @before-leave="instance.eventBus.$emit('before-close')"
    @enter="instance.eventBus.$emit('open')"
    @leave="instance.eventBus.$emit('close')"
    @after-enter="instance.eventBus.$emit('after-open')"
    @after-leave="instance.eventBus.$emit('after-close')"
  >
    <ModalProvider :instance="instance" />
  </ModalTransition>
</div>
</template>

<script>
import ModalTransition from './ModalTransition.vue';
import ModalProvider from './ModalProvider.vue';

export default {
  components: {
    ModalTransition,
    ModalProvider,
  },
  props: {
    transition: {
      type: String,
      default() {
        return this.$modal.$config.transition;
      },
    },
  },
  computed: {
    instances() {
      return this.$modal.$store;
    },
  },
};
</script>
