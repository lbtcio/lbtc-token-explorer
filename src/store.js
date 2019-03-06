import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: {
      errorShow: false,
      Message: 'Error'
    },
    screen: {
      screenWidth: document.body.clientWidth
    },
    searchData: []
  },
  mutations: {
    //错误信息
    errorMessage(state, data) {
      state.error.errorShow = data.status;
      state.error.Message = data.msg;
    },

    //屏幕大小
    screenSize(state, data) {
      state.screen.screenWidth = data;
    },
  },
  actions: {

  }
})
