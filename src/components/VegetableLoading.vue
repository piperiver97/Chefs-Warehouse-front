<template>
    <div class="loading-container">
      <img class="loading-vegetables" src="../assets/images/hamburge.gif" alt="Loading Vegetables" />
      <p>Cargando...</p>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(19, 15, 15, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .loading-vegetables {
    width: 150px;
    height: auto;
  }
  
  p {
    margin-top: 10px;
    font-size: 1.2rem;
    color: wheat;
  }
  </style>
  