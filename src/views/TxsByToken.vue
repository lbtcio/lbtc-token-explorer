<style lang="scss" scoped>
.txsbytoken {
  margin-bottom: 60px;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  .error {
    color: red;
  }
}
</style>

<template>
  <div class="txsbytoken">
    <Loader v-if="loading"></Loader>

    <div class="container" v-if="!loading">

      <div class="holdings mb40" id="holdings">
        <h2 class="pt25">{{token}}</h2>
        <div class="notice error" v-if="errorMsg">{{errorMsg}}</div>
        <div v-if="!errorMsg">

          <div class="info">
            <Row :gutter="20">
              <Col
                :xs="24"
                :sm="24"
                :md="20"
                :lg="20"
                style="height:100%;padding-top:12px;padding-bottom:12px;"
              >
                <p>{{address}}</p>
              </Col>
              <Col :xs="24" :sm="24" :md="4" :lg="4" style="height:100%;text-align:center">
                <qrcode-vue :value="address" size="140" level="H" class="qrcode"></qrcode-vue>
              </Col>
            </Row>
          </div>

          <div class="transactions mb40">
            <h2 class="">Transactions</h2>
            <div class="table-container">
              <table class="myTable" border="0" cellpadding="10" cellspacing="0" width="100%">
                <tbody>
                  <tr v-for="(item, index) in txsList" :key="item.txid">
                    <td style="text-align: left">
                      <router-link :to="{path:'/txinfo',query: {param: item.txid, byAddr: address}}"  class="ellipsis">{{item.txid}}</router-link>          									
                    </td>
                    <td style="text-align: left">
                      <!-- <a :href="'http://test-explorer.lbtc.io/blockinfo?param=' + item.height" target="_blank">{{item.height}}</a> -->
                      {{item.height}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          
        </div>
      </div>
      
    </div>

  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import TableExpand from "@/components/TableExpand.vue";
import QrcodeVue from "qrcode.vue";

export default {
  name: "TokenBalance",
  components: {
    Loader,
    TableExpand,
    QrcodeVue
  },
  data() {
    return {
      params: {},
      token: '',
      addrtoken: '',
      address: "",
      loading: true,
      txsList: [],
      errorMsg: "",

    };
  },
  computed: {},
  created() {
    this.params = JSON.parse(this.$route.query.params);
    this.token = this.params.token;
    this.addrtoken = this.params.tokenaddress;
    this.address = this.$route.query.byAddr;
    this.getlisttxs(this.address, this.addrtoken);
  },
  mounted() {},
  methods: {

    getlisttxs(addr, addrtoken) {
      this.$http.get(this.$api.getaddresstokentxids, { addr: addr, addrtoken: addrtoken }).then( txs => {
        if (txs.error) {
          this.loading = false;
          this.errorMsg = 'No data';
          this.txsList = [];
        } else {
          this.loading = false;
          this.errorMsg = '';
          this.txsList = txs.msg;
        }
      })
    },

    // 添加分隔符
    insert_flg(num, decimal) {
      var num = (num || 0).toString(),
        result = "";
      while (num.length > decimal) {
        result = "." + num.slice(-decimal) + result;
        num = num.slice(0, num.length - decimal);
      }
      if (num) {
        result = num + result;
      }
      return result;
    }
  },
  watch: {
    $route(to, from) {
      if (to.fullPath != from.fullPath) {
        
      }
    },

    showLock(newVal, oldVal) {
      if (newVal == false) {
        this.availablebalance = 0;
        this.lockbalance = [];
      }
    }
  }
};
</script>