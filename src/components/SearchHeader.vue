<template>
    <b-row class=" mt-5 justify-content-md-center  justify-content-between">
        <b-col  xl="5" lg="4" md="9" sm="12" class="mb-3">
            <b-form-input size="lg"  placeholder="Search task name or desc" type="search" v-model="searchInput"></b-form-input>
            <b-alert show v-if="searchInput.length" class="mt-2">
               <h5> Found "{{store.getFilterCounter}}" matching for "{{ searchInput }}"</h5>
            </b-alert>
        </b-col>
    </b-row>
</template>
<script>
import debounce from 'lodash.debounce';
import { useMainStore } from '@/store.js';
export default {
    name: 'search-header',
    setup () {
        const store = useMainStore()
        return { store }
    },
    data() {
        return {
            searchInput: ''
        }
    },
    watch:{
        searchInput: debounce(async function () {
            this.store.searchTasks(this.searchInput)
        }, 1000),
    }
}
</script>