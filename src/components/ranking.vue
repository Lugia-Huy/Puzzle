<template>
  <fieldset class="container">
    <legend>Ranking Scores</legend>
    <table class="score-table">
      <tr class="score-list" v-for="(scoreCur, index) in scoreData" :key="index">
        <td>{{ scoreCur.user }}</td>
        <td>: ....{{ scoreCur.score }}</td>
      </tr>
    </table>
  </fieldset>
</template>
  
<script>
import config from '@/services/config';

export default {
  name: 'Ranking',
  data() {
    return {
      scoreData: config.scoreStorage.fetch(),
      visibility: 'all'
    }
  },
  created() {
    this.scoreData = this.sortByKey(this.scoreData, 'score');
  },
  methods: {
    sortByKey(array, key) {
      return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      });
    },
  },
}
</script>
  
<style scoped>
.container {
  width: 25em;
  min-height: 500px;
  padding: 0 4em;
  margin: 0 auto 0 auto;
  border: 2px solid rgb(0, 0, 0);
  border-right-color: rgb(170, 170, 170);
  border-bottom-color: rgb(170, 170, 170);
}

legend {
  color: #f00;
  font-size: 30px;
}

.score-table {
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
}

table {
  text-align: left;
  margin-top: 10px;
  max-height: 400px;
  padding: 10px 10px;
  border: 1px solid black;
  background-color: #fff;
  color: darkblue;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
</style>