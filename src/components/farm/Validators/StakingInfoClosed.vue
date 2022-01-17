<template>
  <transition name="fall" appear>
  <div v-if="validator" class="grid grid-cols-4 grid-rows-1 mb-1 pl-4 py-2 dark:from-slightDark items-center from-slightGray to-transparent dark:hover:bg-slightDark hover:bg-slightGray rounded-lg border-l border-doneGreen" >
    <div class="text-doneBlue-light">{{ validator.name }}</div>
    <div class="rounded-md align-middle">
      <div class="flex items-center align-middle space-x-2">
        <i class="las la-layer-group text-doneGreen text-4xl"></i>
        <div class="flex flex-col">
          <p class="text-sm text-doneBlue-light">Total Staked:</p>
          <p class="text-sm text-el">{{ prettify(validator.totalDelegated) }}</p>
        </div>
      </div>
    </div>
    <div class="rounded-md align-middle xs:invisible ss:invisible sm:invisible">
      <div class="flex items-center align-middle space-x-2">
        <i class="las la-percent text-doneGreen text-4xl"></i>
        <div class="flex flex-col">
          <p class="text-xs">Expected Return:</p>
          <p class="text-sm text-el">{{ validator.apr }}%</p>
        </div>
      </div>
    </div>
    <div class="flex justify-end w-full">
            <div @click="selectValidator()" class="flex items-center space-x-2 rounded-full group bg-gray-100 hover:bg-gray-200 dark:bg-doneDark-gray dark:hover:bg-gray-900 pl-3 cursor-pointer">
              <p class="text-sm text-gray-500 dark:text-doneBlue-light">Details</p>
              <i class="las la-arrow-down text-lg p-2 text-gray-500 dark:text-doneBlue-light rounded-full bg-gray-100 dark:bg-doneDark-gray group-hover:bg-doneGreen dark:group-hover:text-doneDark-gray group-hover:text-gray-100 border-2 border-gray-200 dark:border-gray-700"></i>
            </div>
          </div>
  </div>
</transition>
</template>

<script>
  import defione from "@/shared/defione.js";
  import { ethers } from "ethers";

  export default {
    name: "StakingInfo",
    mixins: [defione],
    props: {
      validator: Object,
    },
    data() {},
    async mounted() {},
    methods: {
      selectValidator: function () {
        this.$emit("selectValidator", this.validator.address);
      },
      prettify: function(number){
        return ethers.utils.commify(number)
      },
    },
  };
</script>

<style lang="scss" scoped></style>
