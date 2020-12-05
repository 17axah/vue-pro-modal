<template>
  <ModalTransition
    :name="transition"
    @before-enter="onBeforeOpen"
    @before-leave="onBeforeClose"
    @enter="onOpen"
    @leave="onClose"
    @after-enter="onAfterOpen"
    @after-leave="onAfterClose"
  >
    <div
      v-if="value"
      tabindex="1"
      class="modal"
      :class="modalClasses"
      :style="modalStyles"
      @keyup.esc.once.stop="onEscape"
    >
      <div
        v-if="overlay"
        class="modal__overlay"
        @click.once="clickOnOverlay"
        @click="persistentClick"
      />

      <ModalTransition :name="loadingTransition" mode="out-in">
        <slot v-if="loading" name="loading">
          <IconLoading class="modal__loading modal-view" />
        </slot>

        <div
          v-else
          ref="container"
          class="modal__container modal-view"
          :class="containerClasses"
          :style="containerStyles"
        >
          <slot v-bind="{ close }" />
        </div>
      </ModalTransition>
    </div>
  </ModalTransition>
</template>

<script>
import IconLoading from './icons/Loading.vue';
import ModalTransition from './ModalTransition.vue';

// eslint-disable-next-line no-unused-vars
let modalCounter = 0;

export default {
  components: {
    ModalTransition,
    IconLoading,
  },
  inject: {
    $instance: {
      default: null,
    },
  },
  provide() {
    return {
      $modalProps: this.$props,
      $close: this.close,
    };
  },
  props: {
    value: {
      type: Boolean,
      default() {
        return Boolean(this.$instance);
      },
    },
    transition: {
      type: String,
      default() {
        return this.$modal.$config.transition;
      },
    },
    loadingTransition: {
      type: String,
      default() {
        return this.$modal.$config.loadingTransition;
      },
    },
    overlay: {
      type: Boolean,
      default() {
        return this.$modal.$config.overlay;
      },
    },
    fullscreen: {
      type: Boolean,
      default() {
        return this.$modal.$config.fullscreen;
      },
    },
    layout: {
      type: Boolean,
      default() {
        return this.$modal.$config.layout;
      },
    },
    noPadding: {
      type: Boolean,
      default() {
        return this.$modal.$config.noPadding;
      },
    },
    noRadius: {
      type: Boolean,
      default() {
        return this.$modal.$config.noRadius;
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default() {
        return this.$modal.$config.persistent;
      },
    },
    scrollLock: {
      type: Boolean,
      default() {
        return this.$modal.$config.scrollLock;
      },
    },
    closeOnOverlay: {
      type: Boolean,
      default() {
        return this.$modal.$config.closeOnOverlay;
      },
    },
    closeOnEscape: {
      type: Boolean,
      default() {
        return this.$modal.$config.closeOnEscape;
      },
    },
    focusableElement: {
      type: String,
      default() {
        return this.$modal.$config.focusableElement;
      },
    },
    modalClass: {
      type: [Array, String, Object],
    },
    containerClass: {
      type: [Array, String, Object],
    },
    width: {
      type: String,
    },
    maxWidth: {
      type: String,
    },
    height: {
      type: String,
    },
    maxHeight: {
      type: String,
    },
    zIndex: {
      type: [String, Number],
      default() {
        return this.$modal.$config.zIndex;
      },
    },
  },
  data() {
    return {
      previousFocusElement: null,
    };
  },
  computed: {
    modalClasses() {
      return [
        this.modalClass,
        {
          loading: this.loading,
          fullscreen: this.fullscreen,
        },
      ];
    },
    modalStyles() {
      return {
        zIndex: this.zIndex,
      };
    },
    containerClasses() {
      return [
        this.containerClass,
        {
          layout: this.layout,
          'no-padding': this.noPadding,
          'no-radius': this.fullscreen,
        },
      ];
    },
    containerStyles() {
      return {
        width: this.width,
        maxWidth: this.maxWidth,
        height: this.height,
        maxHeight: this.maxHeight,
      };
    },
  },
  methods: {
    focusModal(element) {
      const focusableElement = element.querySelector(this.focusableElement) || element;

      this.previousFocusElement = document.activeElement;

      focusableElement.focus();
    },
    blurModal() {
      if (this.previousFocusElement) {
        this.previousFocusElement.focus();
      }
    },
    close() {
      if (this.$instance) {
        this.$modal.close(this.$instance.id).catch(() => {});
      } else {
        this.$emit('input', false);
      }
    },
    lockScroll() {
      const hasScroll = window.innerWidth > document.documentElement.scrollWidth;

      if (hasScroll) {
        const { scrollTop } = document.documentElement;

        document.body.classList.add('body-scroll-lock');
        document.body.style.top = `-${scrollTop}px`;
      }
    },
    unlockScroll() {
      const scrollTop = Math.abs(parseInt(document.body.style.top, 10));

      document.body.classList.remove('body-scroll-lock');
      document.body.style.top = '';

      document.documentElement.scrollTop = scrollTop;
    },
    clickOnOverlay() {
      if (this.closeOnOverlay && !this.persistent) {
        this.close();
      }
    },
    persistentClick() {
      const { container } = this.$refs;

      if (this.persistent && container) {
        container.classList.add('persistent-animate');

        setTimeout(() => container.classList.remove('persistent-animate'), 100);
      }
    },
    onEscape() {
      if (this.closeOnEscape) {
        this.close();
      }
    },
    onBeforeOpen(element) {
      modalCounter += 1;

      this.$emit('before-open', element);
    },
    onBeforeClose(element) {
      modalCounter -= 1;

      this.$emit('before-close', element);
    },
    onOpen(element) {
      this.focusModal(element);

      if (this.scrollLock && modalCounter === 1) {
        this.lockScroll();
      }

      this.$emit('open', element);
    },
    onClose(element) {
      this.blurModal();

      if (this.scrollLock && !modalCounter) {
        this.unlockScroll();
      }

      this.$emit('close', element);
    },
    onAfterOpen(element) {
      this.$emit('after-open', element);
    },
    onAfterClose(element) {
      this.$emit('after-close', element);
    },
  },
  created() {
    if (this.$instance) {
      this.$instance.eventBus.$on('before-open', this.onBeforeOpen);
      this.$instance.eventBus.$on('before-close', this.onBeforeClose);
      this.$instance.eventBus.$on('open', this.onOpen);
      this.$instance.eventBus.$on('close', this.onClose);
      this.$instance.eventBus.$on('after-open', this.onAfterOpen);
      this.$instance.eventBus.$on('after-close', this.onAfterClose);
    }
  },
};
</script>

<style lang="sass">
.body-scroll-lock
  overflow-y: scroll
  position: fixed
</style>

<style lang="sass" scoped>
.modal
  padding: 15px
  width: 100vw
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  position: fixed
  top: 0
  left: 0
  outline: none
  box-sizing: border-box

  &__overlay
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    background-color: rgba(0, 0, 0, 0.5)

  &__container
    position: relative

    &.layout
      background: #ffffff

    &.layout:not(.no-padding)
      padding: 10px

    &.layout:not(.no-radius)
      border-radius: 6px

  &__loading
    color: #ffffff
    width: 24px
    height: 24px
    z-index: 1

  &.fullscreen
    padding: 0

    .modal__container
      width: 100%
      height: 100%

  .persistent-animate
    animation: persistent 0.2s

@keyframes persistent
  0%
    transform: scale(1)

  50%
    transform: scale(1.02)

  100%
    transform: scale(1)
</style>
