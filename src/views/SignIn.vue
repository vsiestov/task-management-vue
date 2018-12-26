<template>
    <div class="layout">

        <form @submit.prevent="onSubmit()">
            <div class="input__wrap">
                <input
                    class="input"
                    type="email"
                    placeholder="Email"
                    required
                    v-model="form.email"
                    :class="{invalid: errors.email}"
                    @input="onInputChange('email')"
                />
                <div role="alert" class="alert" v-if="errors.email">{{ errors.email }}</div>
            </div>

            <div class="input__wrap">
                <input
                    class="input"
                    type="password"
                    placeholder="Password"
                    required
                    v-model="form.password"
                    :class="{invalid: errors.password}"
                    @input="onInputChange('password')"
                />
                <div role="alert" class="alert" v-if="errors.password">{{ errors.password }}</div>
            </div>

            <div class="input__controls">
                <button class="button" type="submit">Submit</button>
            </div>

            <div>
                <routerLink to="/sign-up">Sign up</routerLink>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IAuth } from '@/interfaces/users.interfaces';
import { isFormValid, isItemValid } from '@/helpers/validator';
import { errorMessage } from '@/helpers/constants';

@Component
export default class SignIn extends Vue {
  public form: IAuth = {
    email: '',
    password: ''
  };

  public errors: any = {
  };

  public onInputChange(name: string) {
    isItemValid(this.errors, this.form, name);
  }

  public async onSubmit() {
    if (!isFormValid(this.form, this.errors)) {
      return await this.$store.dispatch('error', errorMessage('Fill all required fields'));
    }

    await this.$store.dispatch('signIn', this.form);
  }
}
</script>
