<template>
    <button class="btn-black outline-remove">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "button-black"
}
</script>

<style scoped>
    .outline-remove{
        outline: none;
    }
</style>