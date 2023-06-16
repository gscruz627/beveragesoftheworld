<template>
    <div class="mainbody">
        <Sidebarexplore />
        <div class="dropdown">
                <button class="dropbtn">Filter</button>
                <div class="dropdown-content">
                    <li @click="filterHtL">$$$ - $</li>
                    <li @click="filterLtH">$ - $$$</li>
                    <li @click="filterAlph">Alphabetically</li>
                </div>
            </div>
        <div v-if="beverages" class="card-wrapper">
            <BeverageCard v-for="(beverage, i) in beverages" :key="beverage.id" :beverage="beverage"></BeverageCard>
        </div>
        <div v-else>
            <p>Loading</p>
        </div>
    </div>
</template>
<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import BeverageCard from "../components/BeverageCard.vue";
import { onUpdated } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import Sidebarexplore from "../components/Sidebarexplore.vue"
export default {
    name: "BeveragesByCountry",
    components: {
        BeverageCard,
        Sidebarexplore
    },
    props: {
        "country": String
    },
    setup() {
        const route = useRoute();
        let country = route.params.name;
        let previousCountry = null;
        const store = useStore();
        onUpdated(() => {
            previousCountry = country;
            country = route.params.name;
            if(previousCountry !== country){
                store.dispatch("loadBeverages", { filter: "country", country: country })
            }
        })
        const beverages = computed({
            get: () => store.state.beverages,
            set: (value) => store.commit('setBeverages', value),
        });
        onMounted(() => {
            store.dispatch("loadBeverages", { filter: "country", country: country })
            previousCountry = country;
        });
        const filterHtL = () => {
            let filteredBeverages = beverages.value;
            filteredBeverages = filteredBeverages.sort( (a,b) => 
                parseFloat(b.cost) - parseFloat(a.cost)
            )
        }
        const filterLtH = () => {
            let filteredBeverages = beverages.value;
            filteredBeverages = filteredBeverages.sort( (a,b) => 
                parseFloat(a.cost) - parseFloat(b.cost)
            )
        }
        const filterAlph = () => {
            let filteredBeverages = beverages.value;
            filteredBeverages = filteredBeverages.sort( (a,b) => 
            a.name.localeCompare(b.name)
            );
        }
        return {
            beverages, filterHtL, filterLtH, filterAlph
        }
    }
}

</script>