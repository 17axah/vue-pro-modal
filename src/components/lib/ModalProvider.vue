<template>
<component
  :is="component"
  v-bind="instance.props"
  v-on="instance.listeners"
/>
</template>

<script>
export default {
  props: {
    instance: {
      type: Object,
      required: true,
    },
  },
  provide() {
    return {
      $instance: this.instance,
    };
  },
  computed: {
    component() {
      return () => this.$modal.$config.import(this.instance.name);
    },
  },
};
</script>
