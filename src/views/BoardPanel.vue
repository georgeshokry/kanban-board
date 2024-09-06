<template>
  <div>
    <board-header></board-header>
    <b-container>
      <search-header></search-header>
      <board-columns></board-columns>
    </b-container>
    <add-task-modal />
  </div>
</template>


<script>
import BoardColumns from "@/views/BoardColumns.vue";
import SearchHeader from "@/components/SearchHeader.vue";
import BoardHeader from "@/components/BoardHeader.vue";
import AddTaskModal from "@/components/AddTaskModal.vue";
export default {
  name: 'board-panel',
  components: {
    BoardColumns,
    BoardHeader,
    SearchHeader,
    AddTaskModal
  }
}
</script>