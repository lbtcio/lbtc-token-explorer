<style lang="scss">
.table-expand {
  .table-lock {
    margin: 15px auto 0 auto;
    table {
      padding: 0 10px;
      margin-top: 10px;
      max-width: 650px;
      tr td {
        height: 32px;
        font-size: 14px;
      }
    }
  }
}
</style>
<template>
  <div class="table-expand">
    <div class="table-container table-lock">
      <p class="mb15">
        <strong>Available balance:</strong>
        {{getFullNum(decimal(row.availablebalance).div(Math.pow(10, row.decimal)).toNumber())}} {{row.tokenSymbol}}
      </p>
      <p class="mb15">
        <strong>Lock balance:</strong>
        {{row.lock_balance ? getFullNum(decimal(row.lock_balance).div(Math.pow(10,row.decimal)).toNumber()) : 0}} {{row.tokenSymbol}}
      </p>
      <table class="myTable" border="0" cellpadding="10" cellspacing="0" width="100%" v-if="row.lockbalance">
        <thead>
          <tr>
            <th>#</th>
            <th>Expiry Height</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody is="transition-group" name="list">
          <tr v-for="(item, index) in row.lockbalance" :key="index" class="list-item">
            <td>{{index + 1}}</td>
            <td>{{item.expiryheight}}</td>
            <!-- <td>{{item.amount}}</td> -->
            <td>{{getFullNum(decimal(item.amount).div(Math.pow(10,row.decimal)).toNumber())}}</td>
          </tr>
        </tbody>
      </table>
      <br>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    row: Object
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    init() {

    }
  },
  destroyed() {},
  watch: {}
};
</script>