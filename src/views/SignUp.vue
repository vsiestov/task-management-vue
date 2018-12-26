<template>
    <div class="layout">
        <div class="align-center">
            <form @submit.prevent="onSubmit()" novalidate class="form">
                <h1 class="page__header">Sign Up</h1>

                <Input placeholder="First name" name="firstName" :required="true" @input="form.firstName = $event" />

                <Input placeholder="Last name" name="lastName" :required="true" @input="form.lastName = $event" />

                <Input placeholder="Email" type="email" name="email" :required="true" @input="form.email = $event" />

                <Input placeholder="Password" type="password" name="Password" :required="true" @input="form.password = $event" />

                <div class="input__controls">
                    <routerLink to="/sign-in">Sign In</routerLink>
                    <button class="button" type="submit" formnovalidate>Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { IRegistration } from '@/interfaces/users.interfaces';
import { errorMessage } from '@/helpers/constants';
import { isFormValid, isItemValid } from '@/helpers/validator';
import Input from '@/components/Input.vue';

@Component({
  components: {
    Input
  }
})
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
