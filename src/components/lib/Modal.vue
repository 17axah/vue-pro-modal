<template>
  <component
    :is="wrapperComponent"
    :mount-to="mountTo"
    :style="wrapperStyles"
    class="modal-wrapper"
    append
  >
    <ModalTransition
      :name="transition"
      :appear="appear"
      @before-enter="onBeforeOpen"
      @before-leave="onBeforeClose"
      @enter="onOpen"
      @leave="onClose"
      @after-enter="onAfterOpen"
      @after-leave="onAfterClose"
    >
      <div
        v-if="value"
        ref="modal"
        v-scroll-lock:[scrollLockGapMethod]="isScrollLock"
        tabindex="1"
        class="modal"
        :class="modalClasses"
        :style="modalStyles"
        @keyup.esc.once.stop="onEscape"
      >
        <div
          v-if="showOverlay"
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
            data-scroll-lock-scrollable
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
  </component>
</template>

<script>
import { MountingPortal } from 'portal-vue';
import config from '@/lib/config';
import { directive } from 'vue-body-scroll-lock';
import IconLoading from './icons/Loading.vue';
import ModalTransition from './ModalTransition.vue';

export default {
  components: {
    MountingPortal,
    ModalTransition,
    IconLoading,
  },
  inject: {
    $instance: {
      default: null,
    },
    $config: {
      default() {
        return this.$modal?.$config || config;
      },
    },
  },
  provide() {
    return {
      $close: this.close,
    };
  },
  directives: {
    scrollLock: directive,
  },
  props: {
    value: {
      type: Boolean,
      default() {
        return Boolean(this.$instance);
      },
    },
    portal: {
      type: Boolean,
      default() {
        return !this.$instance;
      },
    },
    transition: {
      type: String,
      default() {
        return this.$config.transition;
      },
    },
    loadingTransition: {
      type: String,
      default() {
        return this.$config.loadingTransition;
      },
    },
    appear: {
      type: Boolean,
      default() {
        return this.$config.appear;
      },
    },
    overlay: {
      type: Boolean,
      default() {
        return this.$config.overlay;
      },
    },
    fullscreen: {
      type: Boolean,
      default() {
        return this.$config.fullscreen;
      },
    },
    layout: {
      type: Boolean,
      default() {
        return this.$config.layout;
      },
    },
    noPadding: {
      type: Boolean,
      default() {
        return this.$config.noPadding;
      },
    },
    noRadius: {
      type: Boolean,
      default() {
        return this.$config.noRadius;
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default() {
        return this.$config.persistent;
      },
    },
    scrollLock: {
      type: Boolean,
      default() {
        return this.$config.scrollLock;
      },
    },
    scrollLockGapMethod: {
      type: String,
      default: 'none',
    },
    closeOnOverlay: {
      type: Boolean,
      default() {
        return this.$config.closeOnOverlay;
      },
    },
    closeOnEscape: {
      type: Boolean,
      default() {
        return this.$config.closeOnEscape;
      },
    },
    focusableElement: {
      type: String,
      default() {
        return this.$config.focusableElement;
      },
    },
    mountTo: {
      type: String,
      default: 'body',
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
        return this.$config.zIndex;
      },
    },
    minimize: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      previousFocusElement: null,
    };
  },
  computed: {
    showOverlay() {
      return this.overlay && !this.minimize;
    },
    isScrollLock() {
      return this.value && this.scrollLock && !this.minimize;
    },
    wrapperComponent() {
      return this.portal ? 'MountingPortal' : 'div';
    },
    modalClasses() {
      return [
        this.modalClass,
        {
          minimize: this.minimize,
          loading: this.loading,
          fullscreen: this.fullscreen,
        },
      ];
    },
    wrapperStyles() {
      return {
        zIndex: this.zIndex,
      };
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
    focusModal() {
      const { modal } = this.$refs;
      const focusableElement = modal.querySelector(this.focusableElement) || modal;

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
    onBeforeOpen() {
      this.$emit('before-open');
    },
    onBeforeClose() {
      this.$emit('before-close');
    },
    onOpen() {
      this.focusModal();

      this.$emit('open');
    },
    onClose() {
      this.blurModal();

      this.$emit('close');
    },
    onAfterOpen() {
      this.$emit('after-open');
    },
    onAfterClose() {
      this.$emit('after-close');
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
  width: 100%
  overflow-y: scroll
  position: fixed
</style>

<style lang="sass" scoped>
.modal-wrapper
  position: relative

.modal
  padding: 15px
  width: 100%
  height: 100%
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
    z-index: 5

  &__container
    max-height: 100%
    overflow: auto
    position: relative
    z-index: 15

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
    z-index: 15

  &.fullscreen
    padding: 0

    .modal__container
      width: 100% !important
      height: 100% !important

  &.minimize
    padding: 0
    top: auto
    left: auto
    bottom: 0
    right: 36px
    width: 240px
    height: 180px

    .modal__container
      width: 100%
      height: 100%
      box-shadow: 0px 2px 8px rgba(51, 51, 51, 0.25)

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
