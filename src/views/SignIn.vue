<template>
    <div class="layout">
        <div class="align-center">
            <form @submit.prevent="onSubmit()" class="form">
                <h1 class="page__header">Sign In</h1>

                <Input type="email" placeholder="Email" name="email" :required="true" @input="form.email = $event" />

                <Input type="password" placeholder="Password" name="password" :required="true" @input="form.password = $event" />

                <div class="input__controls">
                    <routerLink class="link" to="/sign-up">Sign up</routerLink>
                    <button class="button" type="submit">Submit</button>
                </div>

            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { IAuth } from '@/interfaces/users.interfaces';
import { isFormValid, isItemValid } from '@/helpers/validator';
import { errorMessage } from '@/helpers/constants';
import Input from '@/components/Input.vue';

@Component({
  components: {
    Input
  }
})
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
