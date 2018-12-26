<template>
    <div class="layout">
        <div class="tasks__header">
            <h1>Your tasks</h1>

            <button class="tasks__action button" @click="onCreateTask()">Create task</button>
        </div>

        <div class="tasks__form" v-if="isFormVisible">
            <form @submit.prevent="onSubmit()" novalidate>
                <div class="input__wrap">
                    <textarea
                        required
                        :class="{invalid: errors.description}"
                        v-model="form.description"
                        @input="onInputChange('description')"
                    ></textarea>
                    <div role="alert" class="alert" v-if="errors.description">{{ errors.description }}</div>
                </div>

                <div class="input__wrap">
                    <input
                        required
                        type="datetime-local"
                        :class="{invalid: errors.due}"
                        ref="dateInput"
                        @input="onInputChange('due', $event)"
                        :value="form.due | dateInput"
                    >
                    <div role="alert" class="alert" v-if="errors.due">{{ errors.due }}</div>
                </div>

                <div class="input__controls">
                    <button class="button" type="button" @click="onCancelTask">Cancel</button>
                    <button class="button" type="submit" formnovalidate>
                        <span v-if="form._id">Update task</span>
                        <span v-else>Add task</span>
                    </button>
                </div>
            </form>
        </div>

        <ul class="tasks__list">
            <li v-for="item in tasks" class="tasks__item">
                <div class="tasks__description">
                    Description: {{ item.description }}
                </div>
                <div class="tasks__due">
                    Due date: {{ item.due | date('DD.MM.YYYY') }}
                </div>
                <div class="tasks__controls">
                    <button class="button" @click="onChangeTask(item)">Change</button>
                    <button class="button" @click="onDeleteTask(item)">Delete</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ITask } from '@/interfaces/tasks.interface';
import { isFormValid, isItemValid } from '@/helpers/validator';
import { errorMessage } from '@/helpers/constants';
import { isValid } from 'date-fns';

@Component
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

  public get tasks(): ITask[] {
    return this.$store.state.tasks;
  }

  public onChangeTask(item: ITask) {
    this.isFormVisible = true;

    this.form = {
      _id: item._id,
      description: item.description,
      due: item.due
    };

  }

  public onDeleteTask(item: ITask) {
    return this.$store.dispatch('deleteTask', item._id);
  }

  public onInputChange(name: string, event: KeyboardEvent) {
    isItemValid(this.errors, this.form, name);

    if (name === 'due') {
      const input = event.target as HTMLInputElement;
      const date = new Date(input.value);

      if (isValid(date)) {
        this.form.due = input.value;
      }

    }
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
