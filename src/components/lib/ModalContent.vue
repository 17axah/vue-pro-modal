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
    getPaddings(el) {
      const paddingTop = parseInt(window.getComputedStyle(el).paddingTop, 0);
      const paddingBottom = parseInt(window.getComputedStyle(el).paddingBottom, 0);

      return paddingTop + paddingBottom;
    },
    onResize() {
      const { content, footer, header } = this.$refs;
      const footerHeight = footer ? footer.offsetHeight : 0;
      const headerHeight = header ? header.offsetHeight : 0;
      const modalPaddings = content ? this.getPaddings(content.closest('.modal')) : 0;
      const containerPaddings = content ? this.getPaddings(content.closest('.modal__container')) : 0;

      this.maxHeight = footerHeight + headerHeight + modalPaddings + containerPaddings;
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
