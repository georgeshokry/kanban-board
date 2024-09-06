<template>
    <b-row class=" mt-5 justify-content-md-center  justify-content-between">
        <b-col  xl="5" lg="4" md="9" sm="12" class="mb-3">
            <b-form-input size="lg"  placeholder="Search task name or desc" type="search" v-model="searchInput"></b-form-input>
        </b-col>
    </b-row>
</template>
<script>
export default {
  name: 'search-header',
  data() {
    return {
        searchInput: ''
    }
  }
}
</script>