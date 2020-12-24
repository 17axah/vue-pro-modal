<template>
  <div id="app" class="app">
    <header class="header">
      <router-link :to="{ name: 'index' }" class="header__logo">
        Vue pro modal
      </router-link>
      <div class="header__links">
        <router-link :to="{ name: 'index' }" class="router-link">
          docs
        </router-link>
        <router-link :to="{ name: 'programmatic' }" class="router-link">
          programmatic
        </router-link>
        <router-link :to="{ name: 'vmodel' }" class="router-link">
          v-model
        </router-link>
      </div>
    </header>

    <div class="app__content">
      <router-view />
    </div>

    <v-modal-target />
  </div>
</template>

<script>
export default {
  mounted() {
    window.app = this;
  },
};
</script>

<style lang="sass">
*
  box-sizing: border-box

body
  margin: 0
  font-family: Helvetica Neue, sans-serif
  color: #2c3e50
  font-size: 14px
  line-height: 22px

h1,
h2,
h3,
h4,
h5,
h6
  margin-top: 0

a
  color: #3eaf7c
  text-decoration: none

.router-link
  display: inline-flex
  position: relative
  font-weight: 600
  color: #2c3e50
  border-bottom: 2px solid transparent
  transition: all 0.2s

  &:hover
    border-color: #46bd87

  &.router-link-exact-active
    border-color: #46bd87

.button
  cursor: pointer
  border: none
  display: inline-block
  font-size: 16px
  color: #fff
  background-color: #3eaf7c
  padding: 9px 20px
  border-radius: 4px
  transition: background-color 0.1s ease
  box-sizing: border-box
  border-bottom: 1px solid #389d70
  outline: none

  &:hover
    background-color: #4abf8a

  &.accent
    background-color: #2c3e50
    border-bottom: 1px solid #2c3e50

    &:hover
      background-color: #415569

.m-a-0
  margin: 0

.m-r-0
  margin-right: 0

.m-r-10
  margin-right: 10px

.m-r-20
  margin-right: 20px

.m-b-0
  margin-bottom: 0

.m-b-10
  margin-bottom: 10px

.m-b-20
  margin-bottom: 20px

.text-right
  text-align: right

.flex
  display: flex

.ai-center
  align-items: center

.jc-between
  justify-content: space-between
</style>

<style lang="sass" scoped>
.app
  padding-top: 50px

  &__content
    padding: 10px 24px

.header
  padding: 10px 24px
  display: flex
  align-items: center
  justify-content: space-between
  background-color: #fff
  border-bottom: 1px solid #eaecef
  width: 100%
  height: 50px
  position: fixed
  top: 0
  left: 0

  &__logo
    font-size: 20px
    font-weight: 600
    color: #2c3e50

  &__links
    a
      margin-right: 12px

      &:last-child
        margin-right: 0
</style>
