<template>
    <div class="input__wrap">
        <input
            class="input"
            :type="type"
            :placeholder="placeholder"
            :required="required"
            :class="{invalid: errors[name]}"
            :value="input"
            @input="onInputChange($event)"
            v-if="type !== 'textarea'"
        />

        <textarea
            class="input"
            :placeholder="placeholder"
            :required="required"
            :class="{invalid: errors[name]}"
            :value="input"
            @input="onInputChange($event)"
            v-else
        ></textarea>
        <div role="alert" class="alert" v-if="errors[name]">{{ errors[name] }}</div>
    </div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { isItemValid } from '@/helpers/validator';

@Component
export default class Input extends Vue {
  @Prop() public required?: boolean;
  @Prop() public placeholder?: string;
  @Prop({
    default: 'name'
  }) public name?: string;
  @Prop() public value?: string;
  @Prop({
    default: ''
  }) public type?: string;

  public input: string = '';

  public errors = {
  };

  public mounted() {
    this.input = this.value || '';
  }

  public onInputChange(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;

    isItemValid(this.errors, {
      [this.name || 'name']: inputElement.value
    }, this.name || 'name');

    this.errors = {...this.errors};

    this.input = inputElement.value;

    this.$emit('input', this.input);
  }

}
</script>
