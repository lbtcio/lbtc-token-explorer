<style lang="scss" scoped>
  .Transaction{
    margin-bottom: 60px;
    a {
      &:hover {
				text-decoration:underline
			}
		}
    .type {
      font-weight: 400;
      padding: 4px 7px;
      border-radius: 4px;
      color: #fff;
    }
    .in {
      background-color: #5cb85c;
    }
    .out {
      background-color: #e67e22;
    }
    .error {
      color: red;
    }
    .txinfoitem:nth-child(2n) {
      background-color: #f8f8f9;
    }
  }
</style>

<template>
  <div class="Transaction">

    <loader v-if="loading"></loader>

    <div class="container" v-if="!loading">
      <div class="info mb40">
        <h2 class="pt25">Transaction&nbsp;&nbsp;&nbsp;</h2>
        <div class="notice error" v-if="txerrormsg">{{txerrormsg}}</div>
        <p class="ellipsis" v-if="!txerrormsg" :title="txinfo.txid"><strong>Transaction ID: </strong><span class="consoleFont">{{txinfo.txid}}</span></p>
      </div>

      <div class="summary mb40" v-if="!txerrormsg">
        <h2>Summary</h2>
        <Row class="txinfoitem">
          <Col span="12" class="ellipsis"><strong>Token:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{ txinfo.Token.symbol }}</Col>
        </Row>
        <Row class="txinfoitem">
          <Col span="12" class="ellipsis"><strong>Height:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">
            <!-- <a :href="'http://test-explorer.lbtc.io/blockinfo?param=' + txinfo.height" target="_blank">{{txinfo.height}}</a> -->
            {{txinfo.height}}
          </Col>
        </Row>
        <Row class="txinfoitem">
          <Col span="12" class="ellipsis"><strong>OP:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{txinfo.Token.op}}</Col>
        </Row>
        <Row class="txinfoitem">
          <Col span="12" class="ellipsis"><strong>Time:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{ txinfo.time | dataFrm }}</Col>
        </Row>
        <Row class="txinfoitem" v-if="txinfo.Token.fromaddress">
          <Col span="12" class="ellipsis"><strong>From:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">
            <router-link :to="{path:'/tokenholdings',query: {param: txinfo.Token.fromaddress}}" class="ellipsis consoleFont">{{txinfo.Token.fromaddress}}</router-link>
          </Col>
        </Row>
        <Row class="txinfoitem" v-if="txinfo.Token.toaddress">
          <Col span="12" class="ellipsis"><strong>To:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">
            <router-link :to="{path:'/tokenholdings',query: {param: txinfo.Token.toaddress}}" class="ellipsis consoleFont">{{txinfo.Token.toaddress}}</router-link>
          </Col>
        </Row>
        <Row class="txinfoitem" v-if="txinfo.Token.amount">
          <Col span="12" class="ellipsis"><strong>Amount:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{txinfo.Token.amount}} {{txinfo.Token.symbol}}</Col>
        </Row>
        <Row class="txinfoitem" v-if="txinfo.Token.totalamount">
          <Col span="12" class="ellipsis"><strong>Total Amount:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">{{txinfo.Token.totalamount}} {{txinfo.Token.symbol}}</Col>
        </Row>
        <Row class="txinfoitem" v-if="byaddr && txinfo.Token.toaddress && txinfo.Token.fromaddress">
          <Col span="12" class="ellipsis"><strong>Type:</strong></Col>
          <Col span="12" style="text-align: right;" class="ellipsis">
            <span class="type out" v-if="txinfo.Token.fromaddress == byaddr">OUT</span>
            <span class="type in" v-if="txinfo.Token.toaddress == byaddr">IN</span>
          </Col>
        </Row>
      </div>

    </div>
    

  </div>
</template>

<script>
  import Loader from "@/components/Loader.vue";
  import moment from "moment";

  export default {
    name: "transaction",
    components: {
      Loader
    },
    data () {
      return {
        loading: true,
        txhash: '',
        byaddr: '',
        txinfo: '',
        txerrormsg: ''
      }
    },
    computed: {
      
    },
    filters: {
      dataFrm: function(el) {
        if (el) {
          return moment(el * 1000).format("YYYY-MM-DD HH:mm:ss");
        } else {
          return '---'
        }
      }
    },
    created () {

    },
    mounted () {
      this.init();
    },
    methods: {
      init() {
        this.txhash = this.$route.query.param;
        if (this.$route.query.from == 'search') {
          this.byaddr = '';
          let data = JSON.parse(this.$route.query.data);
          this.loading = false;
          if (data.Token) {
            this.txinfo = data;
            this.txerrormsg = '';
          } else {
            this.txinfo = '';
            this.txerrormsg = 'No data';
          }
        } else {
          this.byaddr = this.$route.query.byAddr;
          this.getTransactionData(this.txhash);
        }
      },
      getTransactionData(hash) {
        this.$http.get(this.$api.gettxinfo, { param: hash}).then( data => {
          this.loading = false;
          if (data.error) {
            this.txinfo = '';
            this.txerrormsg = data.msg;
          } else {
            if (data.result.Token) {
              this.txinfo = data.result;
              this.txerrormsg = '';
            } else {
              this.txinfo = '';
              this.txerrormsg = 'No data';
            }
          }
        })
      }
    },
    watch: {
      '$route' (to, from) {
        // if (this.txinfo.txid && from.meta == to.meta && this.txinfo.txid != to.query.param) {
        //   this.getTransactionData('gettxinfo', {'param': to.query.param});
        // }
        this.init();
      }
    }
  }
</script>