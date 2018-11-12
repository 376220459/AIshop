<template>
  <div>
    <mt-button type="default" @click="$toast({message: '操作成功',iconClass: 'mintui mintui-success'})">default</mt-button>
    <mt-button type="primary" @click="$message('提示','操作成功')">primary</mt-button>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>

</style>

