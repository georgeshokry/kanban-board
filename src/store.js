import { defineStore } from 'pinia';
const generateUniqueId = require('generate-unique-id');

export const useMainStore = defineStore('main', {
  state: () => {
    return {
        kanban: {
            'Todo': [],
            'Inprogress': [],
            'InReview': [],
            'Done': []
        },
        filteredKanban: null,
        filterCounter: 0,
        taskEdit: null,
        searchInProgress: false,


        taskOldType: null,
        taskNewType: null,
        taskOldIndex: null,
        taskNewIndex: null
    };
  },
  getters: {
    getKanban(state) {
      return state.kanban;
    },
    getTaskEdit(state){
      return state.taskEdit;
    },
    getFilteredKanban(state){
      return state.filteredKanban
    },
    getFilterCounter(state){
      return state.filterCounter
    },
    getSearchInProgress(state){
      return state.searchInProgress
    }
  },
  actions: {
    addNewTask(taskType, task){
      this.$state.kanban[taskType].push({...task, order: 0, priority: 'high', 
        id: generateUniqueId({
          length: 8,
          useLetters: false
        })
      })
      this.saveToLocal()
    },
    editTask(taskId, oldTaskType,taskData){
      const taskToEditIndex = this.$state.kanban[oldTaskType].findIndex((val)=>taskId === val.id)
      if(oldTaskType !== taskData.type){
        this.$state.kanban[oldTaskType].splice(taskToEditIndex, 1);
        this.$state.kanban[taskData.type].push(taskData)
      }else{
        this.$state.kanban[oldTaskType][taskToEditIndex] = taskData
      }
      this.$state.taskEdit = null
      this.saveToLocal()
    },
    editOldTaskType(taskOldIndex, taskNewIndex, taskOldType, taskNewType){
      this.$state.taskOldIndex = taskOldIndex
      this.$state.taskNewIndex = taskNewIndex
      this.$state.taskOldType = taskOldType
      this.$state.taskNewType = taskNewType
    },
    editNewTask(){
      this.saveToLocal()
    },
    saveToLocal(){
      localStorage.setItem('kanban', JSON.stringify(this.$state.kanban))
    },
    readLocalTasks(){
      let userTasks = localStorage.getItem('kanban')
      if(userTasks){
        this.$state.kanban = JSON.parse(userTasks)
      }
    },
    deleteTask(taskType, taskId){
      const taskToDeleteIndex = this.$state.kanban[taskType].findIndex((val)=>taskId === val.id)
      this.$state.kanban[taskType].splice(taskToDeleteIndex, 1);
      this.saveToLocal()
    },
    searchTasks(searchKeyword){
      this.$state.filterCounter = 0
      if(searchKeyword.length){
        this.$state.searchInProgress = true
        const result = Object.keys(this.$state.kanban).reduce((acc, key) => {
          const filteredTasks = this.$state.kanban[key].filter(task => 
              task.title.toLowerCase().includes(searchKeyword.toLowerCase()) || 
              task.desc.toLowerCase().includes(searchKeyword.toLowerCase())
          );
          
          acc.filteredKanbanBoard[key] = filteredTasks;
          acc.count += filteredTasks.length;
          
          return acc;
      }, { filteredKanbanBoard: {}, count: 0 });
        this.$state.filteredKanban = result.filteredKanbanBoard
        this.$state.filterCounter= result.count
      }else{
        this.$state.searchInProgress = false
        this.$state.filteredKanban = null
      }
    }
  }
});