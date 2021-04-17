<template>
      <div class="flex flex-col w-1/6 items-center">
          <i class="fas fa-user text-8xl"></i>
          <span class="text-xl mt-2"> {{ name }} </span>
          <input type="text" v-model="money" class="text-xl my-4 w-1/2 text-center" />
          <div class="flex justify-evenly w-1/2">
              <i @click="money += increaseOrDecreaseBy" class="fas fa-plus text-green-500 cursor-pointer"></i>
              <i @click="money -= increaseOrDecreaseBy" class="fas fa-minus text-red-500 cursor-pointer"></i>
          </div>
      </div>
</template>

<script>
export default {
    name: 'UserModel',
    props: ['name','moneyforinit'],
    data(){
        return {
            money: 0,
            increaseOrDecreaseBy: 10
        }
    },
    watch: {
        money(){
            this.$emit('updatemoney', { money: this.money, targetName: this.name });
        }
    },
    mounted() {
        this.money = this.moneyforinit;
    }
}
</script>

<style>

</style>