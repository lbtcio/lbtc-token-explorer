<style lang="scss">
.token-info {
  margin-bottom: 60px;
  a {
    &:hover {
      text-decoration: underline;
    }
  }
  .error {
    height: 180px;
    line-height: 180px;
    font-size: 18px;
    color: red;
  }
  .info {
    & > * {
      margin-bottom: 5px;
      background-color: #fff;
    }
    .token-info-bg {
      background-color: #f8f8f9;
    }
  }
}
</style>

<template>
  <div class="token-info">
    <Loader v-if="loading"></Loader>

    <div class="container" v-if="!loading">
      <div class="error" v-if="errorMsg">{{errorMsg}}</div>
      <div v-if="!errorMsg">
        <h2 class="pt25">Token Info</h2>

        <div class="info">
          <p class="token-info-bg">
            <strong>Token Address:  </strong>
            <span class="consoleFont">{{tokenAddress}}</span>
          </p>
          <p>
            <strong>Token Name:  </strong>
            <span class="consoleFont">{{tokeninfo.tokenName}}</span>
          </p>
          <p class="token-info-bg">
            <strong>Token Symbol:  </strong>
            <span class="consoleFont">{{tokeninfo.tokenSymbol}}</span>
          </p>
          <p>
            <strong>Creater Name:  </strong>
            <span class="consoleFont">{{ownername}}</span>
          </p>
          <p class="token-info-bg">
            <strong>Creater Address:  </strong>
            <span class="consoleFont">{{tokeninfo.ownerAddress}}</span>
          </p>
          <p>
            <strong>Decimal:  </strong>
            <span class="consoleFont">{{tokeninfo.decimal}}</span>
          </p>
          <p class="token-info-bg">
            <strong>TotalSupply:  </strong>
            <span class="consoleFont">{{tokeninfo.totalSupply}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  name: "TokenBalance",
  components: {
    Loader
  },
  data() {
    return {
      address: "",
      loading: true,
      errorMsg: "",
      tokeninfo: {},
      ownername: ""
    };
  },
  computed: {},
  created() {
    this.tokenAddress = this.$route.query.param;
    this.gettokeninfo(this.tokenAddress);
  },
  mounted() {},
  methods: {
    gettokeninfo() {
      this.$http
        .get(this.$api.getTokeninfo, { param: this.tokenAddress })
        .then(data => {
          if (data.error) {
            this.errorMsg = data.msg;
            this.loading = false;
            this.tokeninfo = {};
          } else {
            this.errorMsg = "";
            this.loading = false;
            this.tokeninfo = data.msg[0];
            this.$http
              .get(this.$api.getNameByAddress, {
                param: data.msg[0].ownerAddress
              })
              .then(res => {
                if (res.error) {
                  this.ownername = "";
                } else {
                  this.ownername = res.msg;
                }
              });
          }
        });
    }
  },
  watch: {
    $route(to, from) {
      if (to.fullPath != from.fullPath) {
        this.tokenAddress = this.$route.query.param;
        this.gettokeninfo(this.tokenAddress);
      }
    }
  }
};
</script>