<template>
    <div id="side-bar" v-if="!isSmall">
        <h2 :style="{'margin-bottom':'1.5rem', 'font-weight':'lighter', 'text-align':'center'}">SELECT BEVERAGES</h2>
        <div>
            <router-link to="/all"><button class="btn-special">All Beverages</button></router-link>
            <button class="btn-special" @click="switchCountryclicked">Shop by Country</button>
            <div id="countries-card" v-if="countryclicked">
            <ul v-if="countries">
                <li v-for="country in countries">
                    <router-link :to="`/country/${country}`">
                        {{ country  }}
                    </router-link>
                </li>
            </ul>
            </div>
            <router-link to="/type/SoftDrink"><button class="btn-special">Shop Soft Drinks</button></router-link>
            <router-link to="/type/Alcohol"><button class="btn-special">Shop Wines and Alcohol</button></router-link>
            <router-link to="/type/Other"><button class="btn-special">Shop Other Beverages</button></router-link>
        </div>
    </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { useMedia } from "../../useMedia.js";
export default {
    name: "Sidebarexplore",
    setup() {
        const isSmall = useMedia("(max-width: 768px)");
        const countryclicked = ref(false);
        const countries = ref([])
        const switchCountryclicked = () => {
            countryclicked.value = !countryclicked.value;
        }
        const loadCountries = async () => {
            const response = await fetch("http://localhost:8000/API/countries");
            const responseJson = await response.json();
            countries.value = responseJson;
        }
        onMounted( () => {
            loadCountries();
        })
        return {
            isSmall, loadCountries, countries, countryclicked, switchCountryclicked
        }
    }
}

</script>
<style>
#side-bar{
    background-color: white;
    padding:1rem;
    min-height:100vh;
}
.btn-special{
    background-color: transparent;
    color: #6C6A66;
    border:1p solid #6C6A66;
    width:100%;
    margin: 0.25rem auto;
}
.btn-special:hover{
    background-color: #c6c6c6 !important;
}
#countries-card{
    position:absolute;
    top:25%;
    left:20%;
    background-color: rgba(255,255,255,0.8);
}
#countries-card ul, #countries-card li{
    list-style: none;
    color:#6C6A66
}
#countries-card a {
    color: #6C6A66
}
#countries-card li{
    width:100%;
    padding:1rem;
}
#countries-card li:hover{
    background-color: #c6c6c6;
}
</style>