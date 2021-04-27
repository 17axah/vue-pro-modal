<template>
  <div ref="content" class="modal-content">
    <header v-if="$scopedSlots.header" ref="header" class="modal-content__header">
      <slot name="header" />
    </header>
    <div class="modal-content__body" :style="bodyStyles">
      <slot name="body" />
    </div>
    <footer v-if="$scopedSlots.footer" ref="footer" class="modal-content__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
import { ResizeObserver } from '@juggle/resize-observer';

export default {
  data() {
    return {
      maxHeight: '',
    };
  },
  computed: {
    bodyStyles() {
      return {
        maxHeight: `calc(100vh - ${this.maxHeight}px)`,
      };
    },
  },
  methods: {
    onResize() {
      const { content, footer, header } = this.$refs;
      const modal = content.closest('.modal');
      const footerHeight = footer ? footer.offsetHeight : 0;
      const headerHeight = header ? header.offsetHeight : 0;
      const paddingTop = parseInt(window.getComputedStyle(modal).paddingTop, 0);
      const paddingBottom = parseInt(window.getComputedStyle(modal).paddingBottom, 0);

      this.maxHeight = footerHeight + headerHeight + paddingTop + paddingBottom;
    },
    resizeObserve() {
      const observer = new ResizeObserver(this.onResize);

      observer.observe(this.$refs.content);
    },
  },
  mounted() {
    this.resizeObserve();
  },
};
</script>

<style lang="sass" scoped>
.modal-content
  &__header,
  &__body,
  &__footer
    padding: 10px

  &__body
    overflow: auto
</style>
