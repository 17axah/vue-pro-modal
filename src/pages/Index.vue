<template>
  <div>
    <div v-html="readme" />
  </div>
</template>

<script>
import readme from '../../README.md';

export default {
  data() {
    return {
      readme,
    };
  },
};
</script>
