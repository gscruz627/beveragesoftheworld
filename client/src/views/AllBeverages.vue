<template>
    <div v-if="beverages">
        <BeverageCard v-for="(beverage, i) in beverages" :key="beverage.id" :beverage="beverage"></BeverageCard>
    </div>
    <div v-else>
        <p>Loading</p>
    </div>
</template>
<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import BeverageCard from "./BeverageCard.vue";
import { onUpdated } from "vue";
import { watch } from "vue";
export default {
    name: "AllBeverages",
    components: {
        BeverageCard
    },
    setup() {
        const store = useStore();
        let shouldLoad = true;
        let loadCounter = 0;
        const beverages = computed({
            get: () => store.state.beverages,
            set: (value) => store.commit('setBeverages', value),
        });
        onMounted(() => {
            store.dispatch("loadBeverages", { filter: "all" })
        })
        return {
            beverages,
        }
    }
}

</script>