<template>
  <div>
    <h2 v-if="title">
      {{ title }}
    </h2>
    <div v-for="row in rows" :key="row" class="m-b-20">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <p>
        Velit, consequuntur in maiores expedita assumenda quisimilique
      </p>
      <p>
        deserunt nobis nostrum magni cumque.
      </p>
      <p>
        Libero sint voluptatem magni tempore facere ipsam unde quibusdam.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [Boolean, String],
      default: 'Default title',
    },
    rows: {
      type: Number,
      default: 1,
    },
  },
};
</script>
