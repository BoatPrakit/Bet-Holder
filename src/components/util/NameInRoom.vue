<template>
    <div class="text-xl mt-2">
        <span v-if="name === host"> {{ name }} (Host) </span>
        <div v-else class="flex items-center justify-between">
            <span class="w-3/4"> {{name}} </span>
                <i @click="deleteName" class="fas fa-times text-red-500 text-2xl cursor-pointer"></i> 
        </div>
    </div>
</template>

<script>
export default {
    name: "NameInRoom",
    props: ['name','host'],
    methods: {
        deleteName(){
            this.$emit('deletename', { targetName: this.name })
        },
    }
}
</script>

<style>

</style>