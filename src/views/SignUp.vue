<template>
    <div class="layout">
        <form @submit.prevent="onSubmit()" novalidate>
            <div class="input__wrap">
                <input
                    class="input"
                    type="text"
                    placeholder="First name"
                    required
                    :class="{invalid: errors.firstName}"
                    v-model="form.firstName"
                    @input="onInputChange('firstName')"
                />
                <div role="alert" class="alert" v-if="errors.firstName">{{ errors.firstName }}</div>
            </div>

            <div class="input__wrap">
                <input
                    class="input"
                    type="text"
                    required
                    placeholder="Last name"
                    :class="{invalid: errors.lastName}"
                    v-model="form.lastName"
                    @input="onInputChange('lastName')"
                     />
                <div role="alert" class="alert" v-if="errors.lastName">{{ errors.lastName }}</div>
            </div>

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
                    minlength="6"
                    required
                    :class="{invalid: errors.password}"
                    v-model="form.password"
                    @input="onInputChange('password')"
                />
                <div role="alert" class="alert" v-if="errors.password">{{ errors.password }}</div>
            </div>

            <div class="input__controls">
                <button class="button" type="submit" formnovalidate>Submit</button>
            </div>

            <div>
                <routerLink to="/sign-in">Sign In</routerLink>
            </div>
        </form>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { IRegistration } from '@/interfaces/users.interfaces';
import { errorMessage } from '@/helpers/constants';
import { isFormValid, isItemValid } from '@/helpers/validator';

@Component
export default class SignUp extends Vue {
  public form: IRegistration = {
    firstName: '',
    lastName: '',
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

    return await this.$store.dispatch('signUp', this.form);
  }
}

</script>
