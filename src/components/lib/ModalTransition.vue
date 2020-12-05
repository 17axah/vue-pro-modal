<template>
<transition v-bind="$attrs" v-on="$listeners">
  <slot />
</transition>
</template>

<style lang="sass" scoped>
.fade-enter-active,
.fade-leave-active
  transition: opacity 0.3s

.fade-enter,
.fade-leave-to
  opacity: 0

.scale-enter-active,
.scale-leave-active
  transition: opacity 0.3s

.scale-enter,
.scale-leave-to
  opacity: 0

.scale-enter-active ::v-deep .modal-view,
.scale-leave-active ::v-deep .modal-view
  transition: transform 0.3s

.scale-enter ::v-deep .modal-view,
.scale-leave-to ::v-deep .modal-view
  transform: scale(0.6)
</style>
