<template>
<div>
  <ModalTransition
    v-for="instance in instances"
    :key="instance.id"
    :name="instance.props.transition || transition"
    @before-enter="instance.eventBus.$emit('before-open', $event, instance)"
    @before-leave="instance.eventBus.$emit('before-close', $event, instance)"
    @enter="instance.eventBus.$emit('open', $event, instance)"
    @leave="instance.eventBus.$emit('close', $event, instance)"
    @after-enter="instance.eventBus.$emit('after-open', $event, instance)"
    @after-leave="instance.eventBus.$emit('after-close', $event, instance)"
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
