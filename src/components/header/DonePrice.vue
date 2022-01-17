<template>
  <!-- Done token info -->
  <tooltip-me>
    <div class="flex rounded-lg focus:outline-none focus:ring-1 focus:ring-black space-x-2 p-2 px-1 md:px-3 items-center">
      <img alt="Done" src="@/assets/done_asset.png" class="ss:h-5 xs:h-6">
      <p class="ss:hidden xs:block text-xs dark:text-doneGreen">${{donePrice}}</p>
    </div>

    <tooltip-me-content :options="tooltip" class="flex text-xs flex-col divide-y-2 divide-doneGreen w-72 p-0.5 rounded-lg shadow-xl">
      <div class="flex flex-col p-3 bg-gray-100 dark:bg-slightDark rounded-md text-gray-500 dark:text-gray-300">
        <div class="ss:flex ss:mb-3 xs:hidden ss:space-x-2 ss:items-center">
          <img alt="Done" src="@/assets/done_asset.png" class="h-5">
          <p>DONE Price: ${{donePrice}}</p>
        </div>
        <div class="flex space-x-2 mb-3 items-center">
          <i class="las la-coins text-xl text-yellow-500"></i>
          <p>Circ. Market Cap: ${{marketCap}} USD</p>
        </div>
        <div class="flex space-x-2 mb-3 items-center">
          <i class="las la-fire-alt text-xl text-red-400"></i>
          <p>Tokens Burnt: {{balances.burnedAmount}} DONE</p>
        </div>
        <div class="flex space-x-2 items-center">
          <i class="las la-fire-alt text-xl text-red-400"></i>
          <p>Tokens Burnt Total: {{balances.totalBurnedAmount}} DONE</p>
        </div>
      </div>
      <div class="flex flex-col p-3 bg-gray-100 dark:bg-slightDark rounded-md text-gray-500 dark:text-gray-300">
        <p class="text-sm mb-3">Token Supply</p>
        <div class="flex space-x-2 mb-3 items-center">
          <i class="las la-hand-holding-usd text-xl text-green-500"></i>
          <p>Circ: {{balances.circSupply}} DONE</p>
        </div>
        <div class="flex space-x-2 mb-3 items-center">
          <i class="las la-globe-europe text-xl text-doneBlue-light"></i>
          <p>Total: {{balances.totalSupply}} DONE</p>
        </div>
        <div class="flex space-x-2 items-center">
          <i class="las la-hourglass-end text-xl"></i>
          <p>Max:</p>
          <i class="las la-infinity text-xl"></i>
          <p>DONE</p>
        </div>
      </div>
    </tooltip-me-content>
  </tooltip-me> 
</template> 

<script>
  import defione from "@/shared/defione.js"
  import { commify } from '@ethersproject/units';
  import { mapGetters } from 'vuex';

  export default {
    name: "Done",
    components: {},
    data() {
      return {
        tooltip: {
          name: new Date().getTime(),
          position: 'bottom',
          color: 'rgba(24, 213, 187, 1)',
          offset: 12,
          speed: 300,
          shift: 50
        },
        ttpObj: null,
        ttpRec: null,
        donePrice: 0.00,
        balances: {
          totalSupply: 0.00,
          circSupply: 0.00,
          burnedAmount: 0.00,
          totalBurnedAmount: 0.00,
          devLocked: 0.00
        },
        marketCap: 0.00,

      }
    },
    mixins: [defione],
    mounted: async function() {
      this.$nextTick(async function() {
        // Grabs the tooltip element
        this.ttpObj = document.querySelector(`div[tooltipme="tooltip-me_${this.tooltip.name}"]`);
        // Format the tooltip the first time
        this.adjustTooltip();
        // Format the tooltip when the user resizes the browser
        window.addEventListener('resize', () => {
          this.adjustTooltip();
        });

        
      })

      let timeout

      if(this.getUserSignedIn()){
        timeout = 1
      } else {
        timeout = 1000
      }

      await setTimeout(async function (){
      await this.loadData()
      }.bind(this), timeout);



      await setInterval(async function(){
        await this.loadData()
      }.bind(this), 15000)
      
    },
    methods: {
      ...mapGetters('wallet', ['getUserSignedIn']),
      getWindowSize() {
        return {
          height: window.innerHeight,
          width: window.innerWidth
        }
      },
      loadData: async function(){
      this.donePrice = await this.getDONEPrice();
      let tempBalances = await this.getBurnAndTotalSupply();
      this.marketCap = commify((tempBalances.circSupply * this.donePrice).toFixed(2));
      this.balances.circSupply = commify(tempBalances.circSupply);
      this.balances.totalSupply = commify(tempBalances.totalSupply);
      this.balances.burnedAmount = commify(tempBalances.burnedAmount);
      this.balances.totalBurnedAmount = commify(parseFloat(tempBalances.burnedAmount) + 1220000)
      },
      adjustTooltip() {
        // gets the tooltip location bounduary
        this.ttpRec = this.ttpObj.getBoundingClientRect();
        // find the middle of the window
        let width = this.getWindowSize().width;
        let xMiddle = width / 2;

        // screen size from 0 - 540
        if (width > 0 && width < 540) {
          // for tooltips at the middle right
          if ((this.ttpRec.width / 2 + this.ttpRec.left) > xMiddle) {
            this.tooltip.shift = 65
          }
        } else if (width >= 540 && width < 1024) {
          // for tooltips at the middle right
          if ((this.ttpRec.width / 2 + this.ttpRec.left) > xMiddle) {
            this.tooltip.shift = 55
          }
        } else if (width > 1024) {
          this.tooltip.shift = 50
        }
      }
    }
  }
</script>