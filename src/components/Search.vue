<template>
    <div class="buscador-voz">
      <button @click="iniciarReconocimiento" class="kitchen-btn">
        🎙️​
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const emit = defineEmits(); 
  
  const resultadoVoz = ref('');
  
  const iniciarReconocimiento = () => {
    const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    reconocimiento.lang = 'es-ES'; 
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;
  
    reconocimiento.onresult = (event) => {
      resultadoVoz.value = event.results[0][0].transcript;
      emit('resultado', resultadoVoz.value);
    };
  
    reconocimiento.onerror = (event) => {
      console.error('Error en el reconocimiento de voz:', event.error);
      if (event.error === 'no-speech') {
        alert('No se detectó habla, por favor inténtalo de nuevo.');
      }
    };
  
    reconocimiento.start();
  };
  </script>
  
  <style scoped>
  .buscador-voz {
    margin-top: 1rem;
  }
  .kitchen-btn {
  }
  </style>
  