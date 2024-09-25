<template>
    <div class="banner">
      <div class="slides">
        <img v-for="(image, index) in images" :key="index" :src="image" alt="Banner Image" />
      </div>
    </div>
  </template>
  
  <script setup>

  </script>
  
  <style>
  .banner {
    position: relative;
    overflow: hidden;
  }
  .slides {
    display: flex;
    transition: transform 0.5s ease;
  }
  .slides img {
    width: 100%;
    height: auto;
  }
  </style>
  