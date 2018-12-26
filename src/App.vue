<template>
  <div id="app" class="main-wrap">
    <header class="header">
      <template v-if="user">
        <div class="header__user">
          {{ user.firstName }} {{ user.lastName }}
        </div>
        <button class="button" @click="onLogout">
          <span>Logout</span>
        </button>
      </template>
      <template v-else>
        <div class="header__user">
          Task management
        </div>
      </template>
    </header>

    <router-view/>

    <transition name="loading">
      <div class="loading" v-if="isLoading">
        Loading ...
      </div>
    </transition>

    <transition name="notification">
      <div class="notification" v-if="errors.length">
        {{ errors[0].msg }}
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IUser } from '@/interfaces/users.interfaces';

@Component
export default class App extends Vue {
  public get isLoading() {
    return this.$store.state.isLoading;
  }

  public get errors() {
    return this.$store.state.errors;
  }

  public get user(): IUser {
    return this.$store.state.user;
  }

  public async onLogout() {
    await this.$store.dispatch('logout');
  }
}
</script>

<style lang="scss">
  @import "styles/main";
</style>
