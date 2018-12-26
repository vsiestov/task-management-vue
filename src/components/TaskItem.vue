<template>
    <li class="tasks__item">
        <div class="tasks__info">
            <div class="tasks__description">
                Description: {{ item.description }}
            </div>
            <div class="tasks__due">
                Due date: {{ item.due | date('DD.MM.YYYY') }}
            </div>
        </div>
        <div class="tasks__controls">
            <button class="button blue" @click="$emit('change', item)">
                <span>Change</span>
            </button>
            <button class="button orange" @click="$emit('delete', item)">
                <span>Delete</span>
            </button>
        </div>
    </li>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { ITask } from '@/interfaces/tasks.interface';

@Component
export default class TaskItem extends Vue {
  @Prop() public item?: ITask;
}
</script>

<style lang="scss">
    @import "../styles/base/var";

    .tasks__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 15px;
    }

    .tasks__description {
        color: $color1;
        font-family: $font-primary;
        font-size: 20px;
        font-weight: 700;
    }

    .tasks__due {
        color: $color2;
        font-family: $font-secondary;
        font-size: 18px;
        font-weight: 400;
    }

    .tasks__controls {
        text-align: right;
    }
</style>
