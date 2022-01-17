<template>
  <!-- Approve disabled -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="buttonState == 'disabled'" class="flex w-28 st5 st5-all justify-between items-center border dark:border-gray-600 border-gray-300 space-x-1 p-2 pl-3 rounded-full group select-none">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-gray-300 dark:text-gray-600">Approve</p>
      </div>
      <i class="las la-times-circle text-xl text-gray-300 dark:text-gray-600"></i>
    </div>
  </transition>

  <!-- Ready to Approve -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div @click="approve()" v-if="buttonState == 'active'" class="flex w-28 group">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-pointer st5">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-doneGreen-dark dark:text-doneGreen group-hover:text-gray-50 dark:group-hover:text-doneDark-gray">Approve</p>
        </div>
        <i class="las la-pen-alt text-xl text-doneGreen-dark dark:text-doneGreen group-hover:text-gray-50 dark:group-hover:text-doneDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Approving -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="buttonState == 'executing'" class="flex w-28 group">
      <div class="grab-attention-glowing"></div>
      <div class="grab-attention cursor-wait st5">
        <div class="flex flex-1 items-center justify-center">
          <p class="text-sm text-doneGreen-dark dark:text-doneGreen group-hover:text-gray-50 dark:group-hover:text-doneDark-gray">Approving</p>
        </div>
        <i class="las la-sync text-xl animate-spin text-doneGreen-dark dark:text-doneGreen group-hover:text-gray-50 dark:group-hover:text-doneDark-gray"></i>
      </div>
    </div>
  </transition>

  <!-- Approved -->
  <transition tag="div" name="approve-btn" class="inline-block absolute">
    <div v-if="buttonState == 'finished'" class="flex w-28 st5 justify-between items-center border border-doneGreen glow-doneGreen-light-md space-x-1 p-2 pl-3 rounded-full dark:bg-doneDark-gray bg-gray-100 cursor-default">
      <div class="flex flex-1 items-center justify-center">
        <p class="text-sm text-doneGreen">Approved</p>
      </div>
      <i class="las la-check-circle text-xl text-doneGreen"></i>
    </div> 
  </transition>
</template>

<script>
  export default {
    name: 'MigrateApproveButton',
    props: {
      buttonState: String
    },
    mounted(){},
    methods: {
      approve: function() {
        this.$emit('approve');
      } 
    }
  }
</script>