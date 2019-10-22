<template>
  <div class="card">
    <header>
      <slot name="header"></slot>
    </header>
    <div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: {
    titulo: String
  }
};
</script>

<style scoped>
.card {
  border-radius: 5px;
  background-color: #fff;
  width: 250px !important;
  padding: 5px;
  margin: 5px 7px;
  text-align: center;
}

header {
  padding: 30px;
}
</style>
