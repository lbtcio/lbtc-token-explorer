<style lang="scss" scoped>
.token-holdings {
  margin-bottom: 60px;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  .holdings .myTable tr:nth-child(2n) {
    background: #ffffff;
  }

  .holdings .myTable tbody tr:hover {
    background: #ffffff;
  }
  .error {
    color: red;
  }
}
</style>

<template>
  <div class="token-holdings">
    <Loader v-if="loading"></Loader>

    <div class="container" v-if="!loading">

      <div class="holdings mb40" id="holdings">
        <h2 class="pt25">Token Holdings</h2>
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

          <div style="margin-bottom: 10px;">A total of {{showHoldings.length}} Tokens found</div>
          <div class="table-container" style="margin-top: 10px" v-if="showHoldings.length">
            <Table class="consoleFont" style="font-size: 16px;" tooltip :columns="header" :data="showHoldings" :border="false"></Table>
          </div>
        </div>
      </div>
      
      <div class="transactions mb40" id="transactions">
        <h2 class="">Transactions</h2>
        <Row class="notice txloading" v-if="txloading">
          <Col>Loading Transactions …</Col>
        </Row>
        <Row class="notice txNodata" style="color:#ed3f14" v-if="txerrormsg">
          <Col>{{txerrormsg}}</Col>
        </Row>
        <Row v-if="!txerrormsg">
          <div class="table-container">
            <table class="myTable" border="0" cellpadding="10" cellspacing="0" width="100%">
              <tbody>
                <tr v-for="(item, index) in txsList" :key="item.txid">
                  <td style="text-align: left">
                    <router-link :to="{path:'/txinfo',query: {param: item.txid, byAddr: address}}" class="ellipsis">{{item.txid}}</router-link>          									
                  </td>
                  <td style="text-align: left">
                    <!-- <a :href="'http://test-explorer.lbtc.io/blockinfo?param=' + item.height" target="_blank">{{item.height}}</a> -->
                    {{item.height}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Row>
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
      address: "",
      loading: true,
      errorMsg: "",
			holdings: [],
			showHoldings: [],
      tokenList: [],

      header: [
        {
          type: "expand",
          width: 25,
          render: (h, params) => {
            return h(TableExpand, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "Token",
          render: (h, params) => {
            return h('div', [
              h('router-link', {
                props: {
                  to: { path: '/txsbytoken', query: { byAddr: this.address, params: JSON.stringify(params.row)}}
                }
              }, params.row.token)
            ])
          }
        },
        {
          title: "Token Address",
          key: "tokenaddress"
        },
        {
					title: "Quantity",
					key: 'quantity'
        }
      ],

      txloading: true,
      txerrormsg: '',
      txsList: []

    };
  },
  computed: {},
  created() {
    this.address = this.$route.query.param;
    this.getlisttoken(this.address);
    this.getlisttxs(this.address);
  },
  mounted() {},
  methods: {
    getlisttoken(addr) {
      this.$http
        .get(this.$api.getBalanceByAddress, { uAddr: addr })
        .then(data => {
          if (data.error) {
            this.errorMsg = data.msg;
            this.loading = false;
						this.holdings = [];
						this.showHoldings = [];
          } else {
            this.errorMsg = "";
            this.loading = false;
            data.msg.forEach((item, index) => {
							item.index = index + 1;
							item.token = "-";
              item.tokenSymbol = "-";
              item.ownerAddress = "-";
              item.tokenName = "-";
              item.decimal = 0;
							let quantity = 0;
							let lock_balance = 0;
              if (item.lockbalance) {
                item.lockbalance.forEach((item, index) => {
                  lock_balance = this.bign(lock_balance).add(item.amount).val();
                });
              }
							item.lock_balance = lock_balance;
              item.quantity = this.bign(lock_balance).add(item.availablebalance).val();
            });
            this.holdings = data.msg;
          }
          this.$http.get(this.$api.getTokeninfo).then(list => {
            if (list.error) {
              this.tokenList = [];
            } else {
              this.tokenList = list.msg;
						}
						let showHoldings = [];
            this.holdings.forEach((item, index) => {
              for (let j = 0; j < this.tokenList.length; j++) {
                const tokenListItem = this.tokenList[j];
                if (item.tokenaddress == tokenListItem.tokenAddress) {
                  item.tokenSymbol = tokenListItem.tokenSymbol;
                  item.tokenName = tokenListItem.tokenName;
                  item.ownerAddress = tokenListItem.ownerAddress;
                  item.decimal = tokenListItem.decimal;
                }
							}
							item.token = item.tokenName + " (" + item.tokenSymbol + ")";
							if (item.quantity && item.quantity != "0") {
                item.quantity = this.decimal(item.quantity).div(Math.pow(10,item.decimal)).toString();
                showHoldings.push(item);
							}
							item.quantity = item.quantity + " " + item.tokenSymbol;
						});
						this.showHoldings = showHoldings;
          });
        });
    },

    getlisttxs(addr) {
      this.$http
        .get(this.$api.getaddresstokentxids, { addr: addr }).then( txs => {
          if (txs.error) {
            this.txloading = false;
            this.txerrormsg = 'No data';
            this.txsList = [];
          } else {
            this.txloading = false;
            this.txerrormsg = '';
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
        this.address = this.$route.query.param;
        this.getlisttoken(this.address);
        this.getlisttxs(this.address);
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