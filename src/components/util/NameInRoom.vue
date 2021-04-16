<template>
    <div class="text-xl mt-2">
        <span v-if="ishost" class=""> {{ name }} (Host) </span>
        <span v-else> {{name}} 
            <i class="fas fa-edit text-green-500"></i>
        </span>
    </div>
</template>

<script>
export default {
    name: "NameInRoom",
    props: ['name','ishost'],
}
</script>

<style>

</style>