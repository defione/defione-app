<template>
  <transition name="horizontal">
    <div v-if="isOpen" class="flex flex-col h-full w-full justify-between absolute">
      <div class="flex flex-col dark:bg-doneDark-gray bg-gray-100 rounded-2xl">
        <div class="flex shadow-lg dark:bg-doneDark-gray bg-gray-100 p-3 rounded-2xl">
          <div class="flex flex-1 items-center justify-between relative">
            <div class="flex h-full flex-col justify-between">
              <p class="text-xs text-doneGreen-dark">Your Unclaimed Rewards</p>
              <p class="text-2xl dark:text-gray-300">{{parseFloat(this.getEthUnits(this.poolData.pendingReward)).toFixed(6)}}</p>
            </div>

            <div v-if="parseFloat(this.getEthUnits(this.poolData.pendingReward)).toFixed(6) > 0" class="glow-collect -right-1.5 z-20"></div>
            
            <div v-if="parseFloat(this.getEthUnits(this.poolData.pendingReward)).toFixed(6) == 0" class="absolute -right-1 w-32 h-14 z-30 flex space-x-2 items-center justify-center rounded-lg bg-gray-100 group-scope dark:bg-doneDark-gray border border-gray-300 dark:border-gray-500 select-none">
              <i class="las la-hand-holding-usd text-3xl text-gray-300 dark:text-gray-500"></i>
              <p class="text-lg text-gray-300 dark:text-gray-500">Collect !</p>
            </div>
            
            <div v-else @click="this.collectDONE(this.pool)" class="absolute -right-1 w-32 h-14 z-30 flex space-x-2 items-center justify-center rounded-lg bg-gray-100 group-scope dark:bg-doneDark-gray hover:bg-doneGreen dark:hover:bg-doneGreen border border-doneGreen-dark dark:border-doneGreen cursor-pointer">
              <i class="las la-hand-holding-usd text-3xl text-doneGreen-dark group-scope-hover:text-gray-50 dark:text-doneGreen dark:group-scope-hover:text-doneDark-gray"></i>
              <p class="text-lg text-doneGreen-dark group-scope-hover:text-gray-50 dark:text-doneGreen dark:group-scope-hover:text-doneDark-gray">Collect !</p>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 pt-3 pb-3 px-3">
          <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <i class="las la-balance-scale-left text-xl text-doneGreen"></i>
            </div>
            <div class="flex flex-col h-full justify-between">
              <p class="text-xs text-doneBlue-light">Stake Weight</p>
              <p class="text-lg dark:text-gray-400">{{stakeWeight.toString()}} %</p>
            </div>
          </div>
          <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <i class="las la-coins text-xl text-doneGreen"></i>
            </div>
            <div class="flex flex-col h-full justify-between">
              <p class="text-xs text-doneBlue-light">Staked LP Tokens</p>
              <p class="text-lg dark:text-gray-400">{{parseFloat(this.getEthUnits(this.poolData.lpBalanceStaked)).toFixed(5)}}</p>
            </div>
          </div>
          <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden">
                <img :src="pool.imgtoken0" class="h-4" alt="">
              </div>
            </div>
            <div class="flex flex-col h-full justify-between pt-0.5">
              <p class="text-xs text-doneBlue-light">{{pool.name[0]}} Staked</p>
              <p class="text-lg dark:text-gray-400">{{pt0s}}</p>
            </div>
          </div>
          <div class="flex h-12 space-x-2">
            <div class="flex items-start h-full">
              <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden">
                <img :src="pool.imgtoken1" class="h-4" alt="">
              </div>
            </div>
            <div class="flex flex-col h-full justify-between pt-0.5">
              <p class="text-xs text-doneBlue-light">{{pool.name[1]}} Staked</p>
              <p class="text-lg dark:text-gray-400">{{pt1s}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col ml-2 mt-2 mb-1 space-y-2 justify-between">
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-calendar-day dark:text-doneGreen"></i>
          <p class="text-sm font-thin dark:text-gray-400">Expected Weekly Rewards: $ {{weeklyRewards}}</p>
        </div>
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-calendar dark:text-doneGreen"></i>
          <p class="text-sm font-thin dark:text-gray-400">Expected Monthly Rewards: $ {{monthlyRewards}}</p>
        </div>
        <div class="flex space-x-2 h-5 items-center">
          <i class="las la-coins dark:text-doneGreen"></i>
          <p class="text-sm font-thin dark:text-gray-400">LP Tokens Available: {{parseFloat(this.getEthUnits(this.poolData.lpBalance)).toFixed(5)}}</p>
        </div>
      </div>

      <div class="flex items-center h-12 pt-2 justify-between">
        <!-- Burn Fees Button 
        <tooltip-me>
          <div @click="this.burnPool(this.pool)" class="flex items-center justify-center ss:space-x-0 ss:pl-0 ss:pr-0 ss:w-9 xs:space-x-2 xs:pl-3 xs:pr-1 xs:w-full md:space-x-0 md:pl-0 md:pr-0 md:w-9 xl:space-x-2 xl:pl-3 xl:pr-1 xl:w-full rounded-full h-9 border border-doneGreen-dark dark:border-doneGreen group-scope hover:bg-red-400 dark:hover:bg-red-400 hover:border-red-400 dark:hover:border-red-400 cursor-pointer">
            <p class="ss:hidden xs:block md:hidden xl:block text-sm text-doneGreen-dark group-scope-hover:text-gray-50 dark:text-doneGreen dark:group-scope-hover:text-doneDark-gray">Burn Fees</p>
            <i class="las la-burn text-2xl text-doneGreen-dark dark:text-doneGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-doneDark-gray"></i>
          </div>  
          <tooltip-me-content :options="tooltip" class="flex w-24 rounded-lg shadow-xl p-0.5">
            <div class="flex w-full text-xs items-center justify-center bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300 rounded-md p-3">
              <p>Burn Fees !</p>
            </div>
          </tooltip-me-content>
        </tooltip-me>
-->
        <!-- Unstake Button -->
        <div @click="this.$emit('setPool', 'unstake')" class="flex items-center space-x-2 pl-3 pr-1 rounded-full h-9 group-scope hover:bg-doneGreen dark:hover:bg-doneGreen border border-doneGreen-dark dark:border-doneGreen cursor-pointer">
          <p class="text-sm text-doneGreen-dark group-scope-hover:text-gray-50 dark:text-doneGreen dark:group-scope-hover:text-doneDark-gray">Unstake</p>
          <i class="las la-sign-out-alt text-2xl text-doneGreen-dark group-scope-hover:text-gray-50 dark:text-doneGreen dark:group-scope-hover:text-doneDark-gray"></i>
        </div>
        <!-- Stake Button -->
        <div @click="this.$emit('setPool', 'stake')" class="flex items-center space-x-2 pl-3 pr-1 rounded-full h-9 group-scope hover:bg-doneGreen dark:hover:bg-doneGreen border border-doneGreen-dark dark:border-doneGreen cursor-pointer">
          <p class="text-sm text-doneGreen-dark group-scope-hover:text-gray-50 dark:text-doneGreen dark:group-scope-hover:text-doneDark-gray">Stake</p>
          <i class="las la-sign-in-alt text-2xl text-doneGreen-dark group-scope-hover:text-gray-50 dark:text-doneGreen dark:group-scope-hover:text-doneDark-gray"></i>
        </div>
        <!-- Refresh Button -->
        <tooltip-me>
          <div class="flex items-center justify-center rounded-full h-9 w-9 group-scope hover:bg-doneGreen dark:hover:bg-doneGreen border border-doneGreen-dark dark:border-doneGreen cursor-pointer">
            <i class="las la-undo-alt text-lg text-doneGreen-dark group-scope-hover:text-gray-50 dark:text-doneGreen dark:group-scope-hover:text-doneDark-gray"></i>
          </div>
          <tooltip-me-content :options="tooltip" class="flex w-24 rounded-lg shadow-xl p-0.5">
            <div class="flex w-full text-xs items-center justify-center bg-gray-100 dark:bg-slightDark text-gray-500 dark:text-gray-300 rounded-md p-3">
              <p>Refresh</p>
            </div>
          </tooltip-me-content>
        </tooltip-me>
        <!-- Close Button -->
        <div @click="closeStats()" class="flex items-center justify-center rounded-full h-9 w-9 group-scope hover:bg-doneGreen dark:hover:bg-doneGreen border border-doneGreen-dark dark:border-doneGreen cursor-pointer">
          <i class="las la-times text-xl text-doneGreen-dark group-scope-hover:text-gray-50 dark:text-doneGreen dark:group-scope-hover:text-doneDark-gray"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import defione from "@/shared/defione.js";
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'PoolStatsInfo',
    mixins: [defione],
    props: {
      isOpen: Boolean,
      pool: Object,
      poolData: Object,
    },
    data() {
      return {
        tooltip: {
          name: new Date().getTime(),
          position: 'top',
          color: 'rgba(24, 213, 187, 1)',
          offset: 16,
          speed: 200,
          shift: 50
        },
        pt0s: '?',
        pt1s: '?',
        stakeWeight: '0 ',
        stakeWeight: '0 ',
        weeklyRewards: '0.00',
        monthlyRewards: '0.00',
        poolState: {}
      } 
    },
    mounted: async function(){
    
      this.stakeWeight = this.poolData.stakeWeight.toFixed(5)
      let rewards = await this.getRewardValue(this.pool, this.poolData.stakeWeight);
  
      this.weeklyRewards = rewards[0];
      this.monthlyRewards = rewards[1];

      let headerData = {
        weeklyRewards: this.weeklyRewards,
        monthlyRewards: this.monthlyRewards 
      }

      this.$emit('rewardsPerTime', headerData)
       
        this.pt0s = parseFloat(this.getFormatedUnitsDecimals(this.poolData.token0Pstaked.toString(), this.pool.decimals[0])).toFixed(8)
        this.pt1s = parseFloat(this.getFormatedUnitsDecimals(this.poolData.token1Pstaked.toString(), this.pool.decimals[1])).toFixed(8)
      
    },
    methods: {
      ...mapGetters('farm/farmData', ['getFarmData']),
      closeStats() {
        this.$emit('setPool', 'close')
        if (window.innerWidth >= 768) {
          this.doneEmit.emit("recalc-tooltips");
        }
      },
      updatePoolState: function(pool){
      var farmData = this.getFarmData()
      var poolData = farmData[pool.i]
     return poolData;
     
      }
    }
  }
</script>