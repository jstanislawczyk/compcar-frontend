<template>
  <div class="not-found">
    <span class="not-found__code">404</span>
    <span class="not-found__description">Oooops. Page not found</span>
  </div>
</template>

<style scoped lang="scss">

  .not-found {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;

    &__code {
      font-size: 150px;
    }

    &__description {
      font-size: 30px;
    }
  }

</style>
