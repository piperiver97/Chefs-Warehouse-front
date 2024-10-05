<script setup>

import Navbar from "@/components/Navbar.vue";
import ServiceBanner from "@/components/servicebanner.vue";
import Servicios from "@/components/Servicios.vue";

</script>
<template>
 <main> 
  <Navbar></Navbar>
<ServiceBanner/>
  <Servicios/>
 </main> 
</template>

<style scoped>
main{
   background: black;
}
</style>
