<template>
  <section class="users">
    <h2 class="users__title">Users</h2>
    <div class="table">
      <div class="table__row">

        <div class="table__row-content">
          <div class="table__column">Email</div>
          <div class="table__column">Role</div>
          <div class="table__column">Active</div>
        </div>
      </div>

      <div
        v-for="(user, index) in users"
        :key="user.id"
        class="table__row table__row--item"
        v-bind:class="[ index % 2 === 0 ? 'table__row--even' : 'table__row--odd' ]"
      >
        <div class="table__row-content">
          <div class="table__column">
            <router-link :to="`/admin/user/${user.id}`" class="table__link">
              {{ user.email }}
            </router-link>
          </div>
          <div class="table__column">{{ user.role }}</div>
          <div class="table__column">{{ user.activated }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { parseGraphQlErrorMessage } from '@/common/errors';
import gql from 'graphql-tag';

export default {
  name: 'AdminUsers',
  data() {
    return {
      users: [],
    };
  },
  async created() {
    await this.setupUsersData();
  },
  methods: {
    async setupUsersData() {
      try {
        const getAllUsersQuery = this.getAllUsersQuery();
        const usersResponse = await this.$apollo.query(getAllUsersQuery);

        const users = usersResponse.data.getUsers;
        this.users = this.buildUsers(users);
      } catch (error) {
        const parsedError = parseGraphQlErrorMessage(error);
        console.log(parsedError);
      }
    },
    getAllUsersQuery() {
      return {
        query: gql`
          {
            getUsers {
              id,
              email,
              role,
              activated,
            },
          }
        `,
      };
    },
    buildUsers(users) {
      return users.map((user) => ({
        id: user.id,
        email: user.email,
        role: user.role.toLowerCase(),
        activated: user.activated,
      }));
    },
  },
};
</script>

<style scoped lang="scss">
  @import 'scss/mixins/table';
  @import 'scss/mixins/controls';

  .users {
    &__title {
      margin-top: 0;
      font-size: 30px;
      text-align: left;
    }
  }

  .table {
    @include table;
  }
</style>
