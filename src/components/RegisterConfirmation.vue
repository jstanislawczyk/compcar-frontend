<template>
  <section class="register-confirmation">
    <h2 class="register-confirmation__header">Email confirmation</h2>

    <div v-if="isConfirmed" class="register-confirmation__info">
      <p>
        User email confirmed successfully. Please go to
        <router-link to="/login" class="register-confirmation__link">login</router-link>
        page.
      </p>
    </div>
    <div v-else class="register-confirmation__info">
      <p>
        Email confirmation failed :/
      </p>
      <p
        v-for="(error, index) in errors"
        :key="index"
        class="register-confirmation__error"
      >
        {{ error }}
      </p>
    </div>
  </section>
</template>

<script>
import { parseGraphQlErrorMessage } from '@/common/errors';
import gql from 'graphql-tag';

export default {
  name: 'RegisterConfirmation',
  data() {
    return {
      isConfirmed: false,
      errors: [],
    };
  },
  async mounted() {
    const confirmationCode = this.$route.params.code;
    await this.confirmEmail(confirmationCode);
  },
  methods: {
    async confirmEmail(confirmationCode) {
      try {
        await this.$apollo.mutate({
          mutation: this.getConfirmEmailMutation(confirmationCode),
        });
        this.isConfirmed = true;
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);

        this.errors.push(parsedError);
      }
    },
    getConfirmEmailMutation(confirmationCode) {
      return gql`
        mutation {
          activateUser (
            confirmationCode: "${confirmationCode}",
          ) {
            id,
          },
        }
      `;
    },
  },
};
</script>

<style scoped lang="scss">
  @import "scss/mixins/pages";

  .register-confirmation {
    @include information-page;
  }
</style>
