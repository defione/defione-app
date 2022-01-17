<template>
  <!-- Approve disabled -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.btnApprove == 'disabled'" class="flex w-28 h-9 justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group-scope select-none">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-gray-300 dark:text-gray-600">Approve</p>
      </div>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Ready to Approve -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div @click="approve()" v-if="this.btnApprove == 'approve'" class="flex w-28 group-scope">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-pointer">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-doneGreen-dark dark:text-doneGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-doneDark-gray">Approve</p>
        </div>
        <i class="las la-pen-alt text-xl text-doneGreen-dark dark:text-doneGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-doneDark-gray"></i>
      </div>
    </div>
  </transition> 

  <!-- Approving -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.btnApprove == 'approving'" class="flex w-28 group-scope">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-wait">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-doneGreen-dark dark:text-doneGreen group-scope-hover:text-white dark:group-scope-hover:text-doneDark-gray">Approving</p>
        </div>
        <i class="las la-sync text-xl animate-spin text-doneGreen-dark dark:text-doneGreen group-scope-hover:text-gray-50 dark:group-scope-hover:text-doneDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Approved -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="this.btnApprove == 'approved'" class="flex w-28 justify-between items-center border border-doneGreen glow-doneGreen-light-md space-x-1 p-2 pl-3 rounded-full cursor-default">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-doneGreen ">Approved</p>
      </div>
      <i class="las la-check-circle text-xl text-doneGreen"></i>
    </div> 
  </transition>
</template>

<script>

  import defione from "@/shared/defione.js";
  import { mapGetters } from 'vuex';
  import { toastMe } from '@/components/toaster/toaster.js'

  export default {
    name: 'farmApprove',
    mixins: [defione],
    emits: ['tellStake'],
    props: {
      amount: String,
      pool: Object,
    },
    data() {
      return {
        btnApprove: 'disabled'
      }
    },
    mounted: async function() {
      var lpToken = {oneZeroxAddress: this.pool.pairaddress, Decimals: 18}
    
      this.btnApprove = 'approving';
      this.$emit('tellStake', 'executing');
      
      let masterchefAddr = this.DONECHEF(this.getChainID());
      let parsedInput = this.getUnits(this.amount, lpToken);
      let allowance = await this.checkAllowance(lpToken, masterchefAddr);
      let isAllowanceSufficient = parsedInput.lt(allowance);
      if (isAllowanceSufficient) {
        this.btnApprove = 'approved';
        this.$emit('tellStake', 'active');
      } else {
        // Ready to approve (Pen Icon)
        this.btnApprove = 'approve';
        this.$emit('tellStake', 'disabled');
      }
    },
    computed: {
      ...mapGetters('addressConstants', ['DONECHEF', 'WONE']),
    },
    methods: {
      ...mapGetters('exchange', ['getToken']),
      ...mapGetters('wallet', ['getChainID']),
      

      approve: async function(){
        var lpToken = {oneZeroxAddress: this.pool.pairaddress, Decimals: 18}
        let masterchefAddr = this.DONECHEF(this.getChainID());
        this.btnApprove = 'approving';

        let tx = await this.approveSpending(lpToken, masterchefAddr);
        
        this.btnApprove = 'approved';
        this.$emit('tellStake', 'active');
      }
    }
  }
</script>