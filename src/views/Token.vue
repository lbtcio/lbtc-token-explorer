<style lang="scss" scoped>
	.token{
		margin-bottom: 60px;
		a {
			&:hover {
				text-decoration:underline
			}
		}
	}
</style>

<template>
  <div class="token">

    <Loader v-if="loading"></Loader>
		
    <div class="container" v-if="!loading">
      <h2 class="pt25">Token List</h2>

			<div class="table-container" style="margin-top: 10px">
				<table class="myTable consoleFont" border="0" cellpadding="10" cellspacing="0" width="100%">
					<thead>
						<tr v-if="!errorMsg">
							<th>
								#
							</th> 
							<th>
								Symbol
							</th>
							<th>
								Token Name
							</th>
							<th>
								Creater Name
							</th>
							<!-- <th>
								Owner Address
							</th> -->
							<th>
								Token Address
							</th>
							<th>
								Decimal
							</th>
							<th>
								TotalSupply
							</th>
						</tr>
						<tr v-if="errorMsg" style="color: rgb(237, 63, 20);">
							<th>
								{{errorMsg}}
							</th>
						</tr>
					</thead>
					<tbody is="transition-group" name="list" v-if="!errorMsg">
						<tr v-for="item in token" :key="item.index" class="list-item">
							<td>{{item.index}}</td>
							<td class="ellipsis" style="max-width: 80px;">
								<router-link :to="{path:'/tokeninfo',query: {param: item.tokenAddress}}" class="ellipsis">{{item.tokenSymbol}}</router-link>          									
							</td>
							<td class="ellipsis" style="max-width: 120px;">
								<router-link :to="{path:'/tokeninfo',query: {param: item.tokenAddress}}" class="ellipsis">{{item.tokenName}}</router-link>          									
							</td>
							<td>
								<router-link :to="{path:'/tokenholdings',query: {param: item.ownerAddress}}" class="ellipsis">{{item.ownerName}}</router-link>          									
							</td>
							<td>
								<router-link :to="{path:'/tokeninfo',query: {param: item.tokenAddress}}" class="ellipsis">{{item.tokenAddress}}</router-link>          									
							</td>
							<td>
								{{item.decimal}}
							</td>
							<td>
								{{item.totalSupply}}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

    </div>
  </div>
</template>

<script>
	import Loader from '@/components/Loader.vue'
  export default {
    name: "token",
    components: {
			Loader
		},
    data () {
      return {
				loading: true,
				page: 1,
				st: '',
				errorMsg: '',
				sw: true,
				sortStatus: '',
				openSort: {
					rankUp: true, 
					rankDown: false,
					votesUp: false,
					votesDown: false,
					ratioUp: false,
					ratioDown: false
				},
				token: [],
				token1: [],
      };
    },
    computed: {
      screenWidth() {
        return this.$store.state.screen.screenWidth
      },
    },
		destroyed () {
			// window.clearInterval(this.st);
			window.removeEventListener("scroll",this.handleFun)
		},
    created () {

			// this.st = window.setInterval( () => {
			// 	this.getlisttoken();
			// }, 15000);
			this.getlisttoken();
			window.addEventListener("scroll",this.handleFun);

    },
    mounted () {

		},
    methods: {

			handleFun() {
				var _this = this;
				window.addEventListener('scroll',function(){  
					var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
					var innerHeight = window.innerHeight;
					var offsetHeight = document.body.offsetHeight;
					var scrollHeight = document.documentElement.scrollHeight;
					if( innerHeight + scrollTop >= (offsetHeight - 30 )) {
						if(_this.sw==true){
							_this.sw = false;
							if (_this.page > 0 && _this.page < Math.ceil(_this.token1.length / 100)) {
									_this.page = _this.page + 1;
									_this.token = _this.token1.slice(0, _this.page*100);
									_this.sw = true;
							}
						}
					}
				});
			},

			getlisttoken() {
				this.$http.get(this.$api.getTokeninfo).then( data => {
					if (data.error) {
						this.token1 = [];
						this.loading = false;
						this.errorMsg = 'No data';
					}else {
						data.msg.forEach((item, index) => {
							item.index = 1 + index;
							// item.name = '';
							// this.$http.get(this.$api.getNameByAddress, {param: item.ownerAddress}).then( name => {
							// 	if (!name.error) {
							// 		this.setName(name.msg, item.ownerAddress)
							// 	}
							// })
						});
						this.token1 = data.msg;
						this.loading = false;
						this.errorMsg = '';
						this.token = this.token1.slice(0, this.page * 100);
					}
				})
			},

			setName(name, address) {
				for (let i = 0; i < this.token1.length; i++) {
					const token1Item = this.token1[i];
					if (token1Item.ownerAddress == address) {
						token1Item.name = name;
						break
					}
				}
			}
			
    },
    watch: {
			
    }
  }
</script>