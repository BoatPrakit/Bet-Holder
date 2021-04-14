<template>
  <div id="nav" class="text-xl font-extrabold h-nav flex items-center justify-between p-10">
    <router-link to="/"> <i class="fas fa-chevron-left"></i> Back</router-link>
    <span>{{ hostusername }}</span>
  </div>
</template>

<script>
export default {
    name: "Navbar",
    props: ['hostusername'],
}
</script>

<style>

</style>