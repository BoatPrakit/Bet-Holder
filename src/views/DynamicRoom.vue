<template>
    <div :class="pointerClass" class="relative">
        <PopUp v-if="isShowPopUp" :option="optionPopUp" @create="createName" @closepopup="openOrClosePopUp"></PopUp>
        <Navbar :hostusername="roomInformation.owner" />
        <div class="bg-gray-bg min-h-content flex w-full">
            <div class="w-3/4 p-16">
                <h1 class="text-3xl font-extrabold">Description: {{ roomInformation.description }}</h1>
                <card class="mt-10 flex">
                    <user-model v-for="user in nameList" 
                    :moneyforinit="user.money" 
                    :key="user.id" 
                    :name="user.name" 
                    @updatemoney="updateMoney"/>
                </card>
            </div>
            <card class="w-1/4 p-16">
                <div class="flex w-full justify-between mb-10">
                    <h1 class="text-3xl font-extrabold">List</h1>
                    <button @click="openOrClosePopUp" class="bg-green-500 text-white px-3"> + </button>
                </div>
                <div v-for="user in nameList" class="flex flex-col" :key="user.name">
                    <NameInRoom @deletename="deleteName" :name="user.name" :host="roomInformation.owner" />
                </div>
            </card>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/util/Navbar'
import NameInRoom from '../components/util/NameInRoom'
import PopUp from "../components/util/PopUp"
import UserModel from '../components/util/UserModel'
import axios from "../axios-instance/backendInstance"

export default {
    name: "DynamicRoom",
    components: {
        Navbar,
        NameInRoom,
        PopUp,
        UserModel
    },
    data(){
        return {
            roomInformation: {},
            pointerClass: '',
            optionPopUp: {
                topic: "Name",
                placeholder: "Enter name",
                invalidValueError: "Please insert name",
                deplicatedError: "This name already already exists. Please change your name",
            },
            isShowPopUp: false
        }
    },
    methods: {
        openOrClosePopUp(){
            this.isShowPopUp = !this.isShowPopUp;
            if(this.isShowPopUp) this.pointerClass = 'pointer-events-none'
            else this.pointerClass = ''
        },
        async createName({ inputValue }){
            await axios.put(`/rooms/${this.$route.params.id}`, {
                ...this.roomInformation,
                nameList: [
                    ...this.roomInformation.nameList,
                    { name: inputValue, money: 0 }
                ]
            })
            this.prepareRoomInformation();
        },
        async prepareRoomInformation(){
            const res = await axios.get(`/rooms/${this.$route.params.id}`);
            this.roomInformation = res.data;
            this.optionPopUp.data = this.roomInformation.nameList.map(user => user.name)
        },
        async deleteName({ targetName }){
            const nameListWithoutTarget = [...this.roomInformation.nameList].filter(user => user.name !== targetName)
            await axios.put(`/rooms/${this.$route.params.id}`, {
                ...this.roomInformation,
                nameList: [...nameListWithoutTarget]
            })
            this.prepareRoomInformation();
        },
        async updateMoney({ money,targetName }){
            const nameListAfterChangeMoney = [...this.roomInformation.nameList]
                .map(user => user.name === targetName ? 
                            { ...user, money: money } :
                            user )
            await axios.put(`/rooms/${this.$route.params.id}`, {
                ...this.roomInformation,
                nameList: [...nameListAfterChangeMoney]
            })
        }
    },
    async mounted(){
        this.prepareRoomInformation();
    },
    computed:{
        nameList(){
            return this.roomInformation.nameList;
        }
    }
}
</script>