<style lang="scss">
header {
  font-family: "Droid Sans Mono", Menlo, Monaco, Consolas, "Courier New",
    monospace;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99999;
  background: #262a2b;
  a {
    color: #e8e8e8;
    white-space: nowrap;
    &:hover {
      color: #cbcbcb;
    }
  }
}
.expanded {
  height: 98px;
  transition: height 0.3s ease-in-out;
  .logo img {
    height: 40px;
  }
  ul {
    list-style: none;
  }
  .igation {
    align-items: center;
    display: flex;
    flex-flow: row nowrap;
    font-weight: 400;
    min-height: 98px;
    justify-content: flex-start;
    margin: 0;
    overflow: visible;
    ul {
      background-color: rgba(255, 255, 255, 0.1);
      left: 0;
      padding: 0;
      position: absolute;
      top: 0;
      width: 135px;
      padding-top: 32px;
      li {
        padding: 2px 10px 4px;
        font-size: 13px;
        &:hover a {
          color: #e8e8e8;
        }
        &:last-of-type {
          margin-bottom: 4px;
        }
      }
      a {
        color: #cbcbcb;
        white-space: nowrap;
      }
    }
    li {
      display: list-item;
      text-align: -webkit-match-parent;
    }
    li.with-children {
      border-radius: 2px 2px 0 0 !important;
      width: 140px;
      padding: 5px 10px;
      position: relative;
      color: #fff;
    }
    li.with-children > span {
      cursor: pointer;
      font-family: "Microsoft YaHei";
      font-size: 15px;
      font-weight: 600;
    }
    & > li:first-of-type {
      margin-right: 30px;
      opacity: 1 !important;
    }
    //logo
    & > li:nth-of-type(1) {
      order: 1;
    }
    //下拉1
    & > li:nth-of-type(2) {
      order: 2;
    }
    //空位
    & > li.flex-space {
      flex-grow: 1;
    }
    & > li:nth-of-type(3) {
      order: 3;
    }
    //搜索框
    & > li:last-of-type {
      margin-left: 25px;
    }
    & > li:nth-of-type(4) {
      order: 4;
    }
    .ivu-input {
      border: 1px solid #fff !important;
      border-radius: 0 !important;
      background-color: #f8f8f9;
      color: #262a2b;
      width: 250px;
      font-size: 14px;
      transition: width 0.3s ease-in-out;
    }
  }
  .message {
    position: absolute;
    top: 65px;
    width: 250px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    background-color: #3c3c3c;
    color: #f8f8f9;
    letter-spacing: 1px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.unexpanded {
  .navbar-header {
    padding: 2px 0;
    overflow: auto;
    .nav-button {
      float: right;
      display: inline-block;
      position: relative;
      height: 50px;
      width: 50px;
      overflow: hidden;
      text-indent: 100%;
      white-space: nowrap;
      color: transparent;
      ul {
        list-style: none;
      }
    }
    .logo {
      float: left;
      height: 50px;
      overflow: hidden;
      display: flex;
      align-items: center;
      img {
        height: 100%;
      }
    }
    &::before {
      clear: both;
    }
    &::after {
      clear: both;
    }
  }
  .navbar-collapse {
    overflow: hidden;
    transition: all 0.2s;
    height: 0;
  }
}
.nav-trigger {
  display: inline-block;
  transition: background 0.2s 0.2s;
  position: absolute;
  top: 24px;
  left: 10px;
  width: 28px;
  height: 3px;
  background-color: #fff;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  &::before {
    bottom: 8px;
  }
  &::after {
    top: 8px;
  }
}
ul.collapse {
  list-style: none;
  margin-left: 15px;
  margin-right: 15px;
  li.with-children {
    transform: all 0.4s;
    color: #b2b2b2;
    line-height: 30px;
    font-size: 15px;
    &:hover {
      color: #fff;
    }
    .children-ul {
      margin-left: 15px;
      list-style: none;
      font-size: 13px;
      li {
        transform: all 0.4s;
        color: #b2b2b2;
        border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        &:hover {
          color: #fff;
        }
        &:last-child {
          border-bottom: none;
        }
        a {
          color: inherit;
        }
      }
    }
  }
  li.input-collapse {
    height: 40px;
    line-height: 40px;
    position: relative;
    .ivu-input {
      border: 1px solid #fff !important;
      border-radius: 0 !important;
      background-color: #f8f8f9;
      color: #262a2b;
      width: 100%;
      font-size: 14px;
      transition: width 0.3s ease-in-out;
    }
    .message {
      position: absolute;
      top: 36px;
      width: 100%;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      background-color: #3c3c3c;
      color: #f8f8f9;
      letter-spacing: 1px;
    }
  }
}

.nav-is-visible .nav-trigger {
  background-color: rgba(255, 255, 255, 0);
}
.nav-is-visible .nav-trigger::before {
  transform: translateY(8px) rotate(-45deg);
}
.nav-is-visible .nav-trigger::after {
  transform: translateY(-8px) rotate(45deg);
}
.nav-trigger::before,
.nav-trigger:after {
  content: "";
  left: 0;
  position: absolute;
  width: 28px;
  height: 3px;
  background-color: #fff;
  backface-visibility: hidden;
  -webkit-transition: -webkit-transform 0.2s 0.2s;
  -moz-transition: -moz-transform 0.2s 0.2s;
  transition: transform 0.2s 0.2s;
}

.changeHeight1 {
  height: 230px;
}
.unexpanded .isExpanded {
  height: 100px;
}
</style>

<template>
  <header>
    <nav
      role="navigation"
      v-if="screenWidth >= 900"
      class="expanded"
      :class="{ changeHeight1: changeHeight1, changeHeight2: changeHeight2 }"
    >
      <div class="container">
        <ul class="igation">
          <li>
            <a class="logo" href="/">
              <img src="../assets/logo.png" alt="Lightning Bitcoin Blockchain Explorer">
            </a>
          </li>

          <li class="with-children">
            <span>
              <router-link to="/">Token</router-link>
            </span>
          </li>

          <li class="flex-space"></li>
          <li>
            <Input
              :disabled="enterStatus"
              v-model="searchText"
              style="width: auto"
              id="search-form"
              suffix="ios-search"
              title="Token Symbol,Token Name,Name,Address or Transaction"
              placeholder="Token Symbol,Token Name,Name,Address or Transaction"
              @on-click="searchTextEnter()"
              @on-enter="searchTextEnter()"
              @on-focus="onFocus(onFocus)"
              @on-blur="onBlur(onBlur)"
            ></Input>
            <div class="message" v-if="errorShow">{{Message}}</div>
          </li>
        </ul>
      </div>
    </nav>

    <nav class="unexpanded" v-if="screenWidth < 900">
      <div class="navbar-header">
        <div class="container">
          <a class="nav-button" href="javascript:;" @click="navVisible()">
            <span class="nav-trigger"></span>
          </a>
          <a class="logo" href="/">
            <img
              v-if="screenWidth >= 356"
              src="../assets/logo-w-t.png"
              alt="Lightning Bitcoin Blockchain Explorer"
            >
            <img
              v-if="screenWidth < 356"
              style="height:90%"
              src="../assets/logo-s.png"
              alt="Lightning Bitcoin Blockchain Explorer"
            >
          </a>
        </div>
      </div>
      <div class="navbar-collapse">
        <div class="container">
          <ul class="collapse">
            <li class="with-children">
              <a href="/">Token</a>
            </li>
            <li class="input-collapse">
              <Input
                :disabled="enterStatus"
                v-model="searchText"
                id="search-form"
                suffix="ios-search"
                placeholder="Token Symbol,Token Name,Name,Address or Transaction"
                @on-click="searchTextEnter()"
                @on-enter="searchTextEnter()"
              ></Input>
              <div class="message" v-if="errorShow">{{Message}}</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import $ from "jquery";
export default {
  name: "HeaderNav",
  computed: {
    errorShow() {
      return this.$store.state.error.errorShow;
    },
    Message() {
      return this.$store.state.error.Message;
    }
  },
  data() {
    return {
      screenWidth: document.body.clientWidth,
      zoomInput: false,
      searchText: "",
      expanded: false,
      clicktag: 0,
      searchLoading: false,
      enterStatus: false,
      changeHeight1: false,
      changeHeight2: false
    };
  },
  created() {
    //监控窗口大小
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
        this.$store.commit("screenSize", that.screenWidth);
      })();
    };
  },
  methods: {
    overShow1() {
      this.changeHeight1 = true;
    },

    outHide1() {
      this.changeHeight1 = false;
    },

    overShow2() {
      this.changeHeight2 = true;
    },

    outHide2() {
      this.changeHeight2 = false;
    },

    toolsOnchang(e) {
      this.$router.push({ path: e });
    },

    networkOnchange(e) {
      location.reload();
    },

    onFocus() {
      $("#search-form input").css("width", "350px");
    },

    onBlur() {
      $("#search-form input").css("width", "250px");
    },

    navVisible() {
      var collapse_header = document.getElementsByClassName("navbar-header")[0];
      var collapse_navbar = document.getElementsByClassName(
        "navbar-collapse"
      )[0];
      if (this.clicktag === 0) {
        this.clicktag = 1;
        if (collapse_header.classList.contains("nav-is-visible")) {
          collapse_header.classList.remove("nav-is-visible");
          collapse_navbar.classList.remove("isExpanded");
        } else {
          collapse_header.classList.add("nav-is-visible");
          collapse_navbar.classList.add("isExpanded");
        }

        window.setTimeout(() => {
          this.clicktag = 0;
        }, 500);
      } else {
      }
    },

    searchTextEnter() {
      if (!this.searchText) {
        return;
      }
      this.$Loading.start();
      this.searchLoading = true;
      this.enterStatus = true;
      var collapse_header = document.getElementsByClassName("navbar-header")[0];
      var collapse_navbar = document.getElementsByClassName(
        "navbar-collapse"
      )[0];

      // tokenSymbol = tokenName > Name > Address > Tx

      if (this.isAddress(this.searchText)) {
        this.$http
          .get(this.$api.getBalanceByAddress, { uAddr: this.searchText })
          .then(res => {
            if (res.error) {
              this.$store.commit("errorMessage", {
                status: true,
                msg: res.msg
              });
              setTimeout(
                () =>
                  this.$store.commit("errorMessage", {
                    status: false,
                    msg: ""
                  }),
                3000
              );
            } else {
              this.$router.push({
                path: "/tokenholdings",
                query: { param: this.searchText }
              });
            }
            this.searchText = "";
            this.searchLoading = false;
            this.enterStatus = false;
            this.$Loading.finish();
          });
      } else {
        let flag = true;
        this.$http
          .get(this.$api.getTokeninfo)
          .then(res => {
            if (!res.error) {
              for (let i = 0; i < res.msg.length; i++) {
                const token = res.msg[i];
                if (
                  token.tokenSymbol == this.searchText ||
                  token.tokenName == this.searchText
                ) {
                  flag = false;
                  this.$router.push({
                    path: "/tokeninfo",
                    query: { param: token.tokenAddress }
                  });
                  this.searchText = "";
                  this.searchLoading = false;
                  this.enterStatus = false;
                  this.$Loading.finish();
                  return Promise.reject(flag);
                }
              }
              if (flag) {
                return Promise.resolve(true);
              }
            }
          })
          .then(flag => {
            return Promise.resolve(
              this.$http
                .get(this.$api.getAddressByName, { param: this.searchText })
                .then(addr => {
                  if (!addr.error) {
                    flag = false;
                    this.$router.push({
                      path: "/tokenholdings",
                      query: { param: addr.msg }
                    });
                    this.searchText = "";
                    this.searchLoading = false;
                    this.enterStatus = false;
                    this.$Loading.finish();
                    return Promise.reject(flag);
                  }
                  if (flag) {
                    return Promise.resolve(true);
                  }
                })
            );
          })
          .then(flag => {
            return Promise.resolve(
              this.$http
                .get(this.$api.gettxinfo, { param: this.searchText })
                .then(data => {
                  if (!data.error) {
                    flag = false;
                    this.$router.push({
                      path: "/txinfo",
                      query: {
                        param: data.result.hash,
                        data: JSON.stringify(data.result),
                        from: "search"
                      }
                    });
                    this.searchText = "";
                    this.searchLoading = false;
                    this.enterStatus = false;
                    this.$Loading.finish();
                    return Promise.reject(flag);
                  }
                  if (flag) {
                    return Promise.resolve(true);
                  }
                })
            );
          })
          .then(flag => {
            if (flag) {
              this.$store.commit("errorMessage", {
                status: true,
                msg: "Input error"
              });
              setTimeout(
                () =>
                  this.$store.commit("errorMessage", {
                    status: false,
                    msg: ""
                  }),
                3000
              );
              this.searchText = "";
              this.searchLoading = false;
              this.enterStatus = false;
              this.$Loading.finish();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  watch: {}
};
</script>

