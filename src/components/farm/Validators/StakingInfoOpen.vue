<template>
  <transition name="fall" appear disappear>
  <div class="flex flex-wrap xs:w-full lg:w-half">
    <div v-if="validator" class="flex min-w-0 w-full text-gray-400 dark:text-gray-300">
      <div class="flex w-full flex-wrap rounded-lg py-3 px-4 items-center dark:from-slightDark from-slightGray to-transparent border border-doneGreen">
        <div class="flex w-full bg-gray-200 dark:bg-doneDark-gray bg-slightGray rounded-lg mb-2">
          <div class="grid grid-cols-3 gap-3 w-full h-auto items-center p-4">
                <div class="flex items-center">
                  <i class="las la-sitemap pl-2 text-lg dark:text-doneGreen"></i>
                  <p class="text-2xl justify-center pl-2">{{ validator.name }}</p>
                </div>
                <div class="flex flex-col text-gray-400 dark:text-gray-300">
                  <p class="text-xl font-extrabold">{{ prettify(validator.totalDelegated) }}</p>
                  <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Total Staked</p>
                </div>
                <div class="flex flex-col text-gray-600 dark:text-gray-200">
                  <p class="text-xl font-extrabold">{{ validator.totalAPR }} %</p>
                  <p class="text-xs font-bold text-gray-500 dark:text-gray-400">Expected Return</p>
                </div>
          </div>
        </div>

        <div class="grid overflow-hidden md:grid-cols-2 sm:grid-cols-1 gap-3.5 w-full">
          <div>
            <ValidatorChart :validator="validator" />
            <p class="text-doneGreen my-1">Info: Harmony validators have an undelegation period of approx. 6 days. however, this is the safest form of earning interest as funds never leave your wallet.</p>
            <ul class="flex mb-0 list-none flex-wrap py-2 flex-row">
              <li class="w-full text-doneGreen my-1">Delegation and undelegation are only supported by Chrome One Wallet extension.</li>
              <li class="w-full text-doneGreen my-1">15% Validator node currently doesnt support token ratio. Will be replaced shortly.</li>
              <li class="w-full text-doneGreen my-1">AutoCompounding and reward ratios with other tokens than ONE is planned. Thank you for securing Harmony.</li>
            </ul>
          </div>
        <div>
        <div class="flex flex-wrap">
          <StakingInfoTabs :validator="validator" />
          <div class="flex w-full">
            <div class="grid w-full xs:grid-cols-2 ss:grid-cols-2 lg:grid-cols-3 gap-2 lg:ml-8 h-auto p-3 bg-gray-200 dark:bg-doneDark-gray shadow-lg rounded">
              <div class="flex space-x-1">
                <div class="flex items-start h-full"><i class="las la-dollar-sign text-xl text-doneGreen"></i></div>
                <div class="flex flex-col h-full justify-between">
                  <p class="text-xs text-doneBlue-light">USD Value Earned</p>
                  <p class="text-lg dark:text-gray-400">$ {{ prettify(this.validator.earnedUsd)}}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden"><img src="https://openfi.dev/tokens/default/ONE.png" class="h-4" alt="" /></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-doneBlue-light">One Earned</p>
                  <p class="text-lg dark:text-gray-400">{{ prettify(this.validator.earnedOne) }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-center justify-center rounded-full bg-gray-50 h-5 w-5 overflow-hidden"><img src="https://openfi.dev/tokens/default/DONE.png" class="h-4" alt="" /></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-doneBlue-light">DONE Earned</p>
                  <p class="text-lg dark:text-gray-400">{{ prettify(this.validator.earnedDone) }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-coins text-xl text-doneGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-doneBlue-light">DONE Reward Ratio</p>
                  <p class="text-lg dark:text-gray-400">% {{100 - this.validator.oxratio }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full"><i class="las la-handshake text-xl text-doneGreen"></i></div>
                <div class="flex flex-col h-full justify-between">
                  <p class="text-xs text-doneBlue-light">Pending Undelegation</p>
                  <p class="text-lg dark:text-gray-400">{{ prettify(this.validator.pendingUndelegation) }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-dollar-sign text-xl text-doneGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-doneBlue-light">One Delegated</p>
                  <p class="text-lg dark:text-gray-400">{{ prettify(this.validator.userDelegations)}}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-doneGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-doneBlue-light">APR</p>
                  <p class="text-lg dark:text-gray-400">% {{ this.validator.apr }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-doneGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-doneBlue-light">Injected APR</p>
                  <p class="text-lg dark:text-gray-400">% {{ this.validator.injectedAPR }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-percentage text-xl text-doneGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-doneBlue-light">Total APR</p>
                  <p class="text-lg dark:text-gray-400">% {{ this.validator.totalAPR }}</p>
                </div>
              </div>
              <div class="flex space-x-1">
                <div class="flex items-start h-full">
                  <div class="flex items-start h-full"><i class="las la-dollar-sign text-xl text-doneGreen"></i></div>
                </div>
                <div class="flex flex-col h-full justify-between pt-0.5">
                  <p class="text-xs text-doneBlue-light">Delegated value</p>
                  <p class="text-lg dark:text-gray-400">$ {{ prettify(this.validator.usdValueDelegated)}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Open Details Button -->
          <div class="flex justify-end w-full mt-2">
            <div @click="selectValidator()" class="flex items-center space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-doneDark-gray dark:hover:bg-gray-900 pl-3 cursor-pointer">
              <p class="text-sm text-gray-500 dark:text-doneBlue-light">close</p>
              <i class="las la-arrow-up text-lg p-2 text-gray-500 dark:text-doneBlue-light rounded-full bg-gray-100 dark:bg-doneDark-gray group-hover:bg-doneGreen dark:group-hover:text-doneDark-gray group-hover:text-gray-100 border-2 border-gray-200 dark:border-gray-700"></i>
            </div>
          </div>
        </div>
          </div>
      </div>
    
       
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import defione from "@/shared/defione.js";
import ValidatorChart from "@/components/farm/Validators/ValidatorChart";
import StakingInfoTabs from "@/components/farm/Validators/StakingInfoTabs";

import { ethers } from "ethers";

export default {
  name: "StakingInfo",
  mixins: [defione],
  components: {
    ValidatorChart,
    StakingInfoTabs,
  },
  props: {
    validator: Object,
  },
  data() {
  },
  async mounted() {},
  methods: {
    
    selectValidator: function () {
      this.$emit("selectValidator", null);
    },
    prettify: function(number){
        if(number != "NA"){
          return ethers.utils.commify(String(number))
        }
        else{
          return number
        }
        
      }
  },
};
</script>

<style lang="scss" scoped></style>
