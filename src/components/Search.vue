<template>
    <div class="tasks__search">
        <input type="search" class="input" v-model="value" placeholder="Filter tasks" @input="$emit('input', value)" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  public value: string = '';
}
</script>

<style lang="scss">
    .tasks__search {
        margin: 0 0 20px;
    }

</style>
