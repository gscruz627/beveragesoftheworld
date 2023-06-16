<template>
    <div v-if="props.beverage" class="card">
        <img :src="props.beverage.picture" :alt="props.beverage.name" class="card-image">
        <div>
            <h3 :style="{'display':'inline'}">{{ props.beverage.name }}</h3>
            <h1 :style="{'display':'inline', 'float':'right'}">$ {{ props.beverage.cost }}</h1>
            <p :style="{'color':'#6C6A66', 'font-style':'italic'}">{{ props.beverage.country }}</p>
            <div class="lower-card">
             <input type="number" v-model="wants" />
            <button class="darkgrey" @click="handleAddCart">Add To cart</button>   
            </div>
            
        </div>
    </div>
    <div v-else>
        <p>Sorry, An unexpected error has occured</p>
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
    emits: ['added'],
    setup(props, {emit}) {
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
            if (wants.value > 0) {
                store.dispatch("addToCart", { amount: wants.value, userId: user.value._id, beverageId: props.beverage._id, token: token });
                document.getElementById("cart").style.backgroundColor = "greenyellow";
                document.getElementById("cart").style.fontSize = "26px";
                setTimeout(() => {
                    document.getElementById("cart").style.backgroundColor = "#FFF";
                    document.getElementById("cart").style.fontSize = "18px";
                }, 500);
            } else {
                alert("Can't add 0 items to cart")
            }
        }
        return {
            props, wants, handleAddCart
        }
    }
}
</script>
<style>
@media screen and (max-width:768px){
    .card{
    width:80%;
    margin: auto auto;
}
}
.card {
    background-color: #FFF;
    display:grid;
    grid-template-rows: 70% 30%;
    max-height:380px;
}
.card-image{
    object-fit: cover;
    width:100%;
    height:100%;
}
.card > div{
    padding:1rem;
}
.lower-card{
    display:flex;
    align-items:center;
    justify-content: center;
    height:50px;
}
.lower-card input{
    padding:1rem;
    border: 1px solid #6a6a6a;
    border-radius:5px;
    height:30px;
    width:80px;
}
.lower-card button{
    height:30px;
    padding: 10px 10px 25px 10px;
}
</style>