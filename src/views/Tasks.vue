<template>
    <div class="layout">
        <div class="tasks__header">
            <h1>Your tasks</h1>

            <button class="tasks__action button blue" @click="onCreateTask()">
                <span>Create task</span>
            </button>
        </div>

        <div class="tasks__form" v-if="isFormVisible">
            <div class="align-center">
                <form @submit.prevent="onSubmit()" novalidate class="form form__inside">
                    <Input type="textarea" placeholder="Description" name="description" :value="form.description" @input="form.description = $event" />

                    <Input type="datetime-local" name="due" :value="form.due" @input="form.due = $event" :required="true"/>

                    <div class="input__controls">
                        <button class="button" type="button" @click="onCancelTask">
                            <span>Cancel</span>
                        </button>
                        <button class="button blue" type="submit" formnovalidate>
                            <span v-if="form._id">Update task</span>
                            <span v-else>Add task</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="tasks.length">
            <Search @input="search.value = $event" />

            <ul class="tasks__list">
                <TaskItem :item="item" :key="item._id" v-for="item in filteredTasks" @change="onChangeTask($event)" @delete="onDeleteTask($event)" />
            </ul>
        </div>
        <div class="tasks__placeholder" v-else>
            You have not tasks yet
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ITask } from '@/interfaces/tasks.interface';
import { isFormValid } from '@/helpers/validator';
import { errorMessage } from '@/helpers/constants';
import { format } from 'date-fns';
import Search from '@/components/Search.vue';
import TaskItem from '@/components/TaskItem.vue';
import Input from '@/components/Input.vue';

@Component({
  components: {
    Search,
    TaskItem,
    Input
  }
})
export default class Tasks extends Vue {
  public isFormVisible: boolean = false;
  public form: {
    description: string,
    due: Date | string,
    _id: null | string
  } = {
    description: '',
    due: '',
    _id: ''
  };
  public errors: any = {
  };
  public search = {
    value: ''
  };

  public get tasks(): ITask[] {
    return this.$store.state.tasks;
  }

  public get filteredTasks(): ITask[] {
    if (!this.search.value) {
      return this.$store.state.tasks;
    }

    return this.$store.state.tasks.filter((item: ITask) => {
      return item.description.toLowerCase().indexOf(this.search.value.trim().toLowerCase()) !== -1;
    });
  }

  public onChangeTask(item: ITask) {
    this.isFormVisible = true;

    this.form = {
      _id: item._id,
      description: item.description,
      due: format(item.due, 'YYYY-MM-DDTHH:MM')
    };

  }

  public onDeleteTask(item: ITask) {
    return this.$store.dispatch('deleteTask', item._id);
  }

  public onCreateTask() {
    this.isFormVisible = true;
  }

  public onCancelTask() {
    this.isFormVisible = false;

    this.form = {
      _id: '',
      description: '',
      due: ''
    };

    this.errors = {
    };
  }

  public onSubmit() {
    if (!isFormValid(this.form, this.errors)) {

      this.errors = {...this.errors};

      return this.$store.dispatch('error', errorMessage('Fill all required fields'));
    }

    if (this.form._id) {
      return this.$store.dispatch('updateTask', this.form)
        .then(() => {
          this.onCancelTask();
        });
    }

    return this.$store.dispatch('createTask', this.form)
      .then(() => {
        this.onCancelTask();
      });
  }

  private async created() {
    await this.$store.dispatch('tasks');
  }
}
</script>

<style lang="scss">
    @import "../styles/base/var";

    .tasks__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 25px;

        h1 {
            color: $color1;
            font-family: $font-primary;
            font-size: 30px;
            font-weight: 700;
        }
    }

    .tasks__placeholder {
        text-align: center;
        color: $color6;
        font-family: $font-secondary;
        font-size: 24px;
        font-weight: 400;
    }
</style>
