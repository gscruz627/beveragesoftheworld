<template>
    <div v-if="props.beverage">
        <img :src="props.beverage.picture" :alt="props.beverage.name" :style="{width:'100px'}">
        <h3>{{ props.beverage.name }}</h3>
        <p>{{ props.beverage.cost }}</p>
        <p>{{ props.beverage.country }}</p>
        <input type="number" v-model="wants"/>
        <button @click="handleAddCart">Add To cart</button>
    </div>
</template>
<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: "BeverageCard",
    props: {
        beverage: Object
    },
    setup(props) {
        console.log(props.beverage);
        const wants = ref(0);
        const store = useStore();
        const user = computed({
            get: () => store.state.user,
            set: (value) => store.commit("setUser", value)
        });
        const token = computed({
            get: () => store.state.token,
            set: (value) => store.commit("setToken", value)
        });
        const handleAddCart = () => {
            if(wants.value > 0){
                store.dispatch("addToCart", {amount: wants.value, userId: user.value._id, beverageId: props.beverage._id, token: token});
            } else {
                alert("Can't add 0 items to cart")
            }
        }
        return{
            props, wants, handleAddCart
        }
    }
}
</script>