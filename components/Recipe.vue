<template>
  <div
    v-if="isLoading"
    id="loader"
    class="loading-spinner recMainSection animate__animated animate__rotateOut"
  >
    <h2>
      <span>a</span>
      <span>r</span>
      <span>l</span>
      <span>i</span>
      <span>n</span>
      <span>a</span>
      <br />
      <span>c</span>
      <span>o</span>
      <span>d</span>
      <span>e</span>
    </h2>
  </div>
  <TransitionGroup
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    v-if="!isLoading"
    name="recAni"
    tag="div"
    class="recMainSection"
    mode="out-in"
  >
    <div
      class="card card-bs"
      @mouseenter="hoverEnter"
      @mouseleave="hoverLeave"
      v-for="(product, index) in products"
      ref="thaCard"
      @click="cofa(product, index)"
      :key="index"
      :product="product"
      data-index="index"
    >
      <img :src="product.image" alt="5 Terre" />
      <div class="rec-details">
        <h4 id="prod-title">{{ product.title }}</h4>
        <p id="prod-price">${{ product.price }}</p>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { ref } from "vue";
import { getMenuProducts } from "~/server/api/getMenuProducts";
import { gsap } from "gsap";
import "animate.css";

const products = ref([]);
const isLoading = ref(true);
const loadingText = ref();
let product = ref(null);

onBeforeMount(async () => {
  products.value = await getMenuProducts();
  const spinnerTimeline = gsap.timeline({ repeat: -1 });
  spinnerTimeline.to(loadingText.value, {
    rotation: 360,
    duration: 1,
    ease: "none",
  });
});

const emits = defineEmits(["products-loaded"]);
const thaCard = ref(null);

onMounted(async () => {
  isLoading.value = false;
});

const cofa = (product, index) => {
  const clickedCard = thaCard.value[0];
  if (clickedCard.classList.contains("onHover")) {
    clickedCard.classList.remove("onHover");
  }
  emits("productSelected", product);
};

const beforeEnter = (e) => {
  // e.style.opacity = 0;
  // e.style.transform = 'translateX(80px)'
  // gsap.from(e, {
  //   opacity: 0,
  //   x: 700,
  // });
};

const enter = (e, done) => {
  gsap.to(e, {
    opacity: 1,
    x: 0,
    duration: 0.9,
    onComplete: done,
    stagger: 0.5,
  });
};

const afterEnter = (e) => {
  // ...
};

const hoverEnter = (e) => {
  e.target.classList.add("onHover");
};

const hoverLeave = (e) => {
  e.target.classList.remove("onHover");
};
</script>

<style>
@font-face {
  font-family: "Calligraffitti", cursive;
  src: url("https://fonts.googleapis.com/css2?family=Baloo+Chettan+2&family=Calligraffitti&display=swap")
    format("truetype");
}
.recMainSection {
  padding: 40px;
  flex: 1;
  width: 100%;
  min-width: 100%;
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  /* background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%); */
}
.card {
  background-color: white;
  /* background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%); */
  box-shadow: rgba(151, 151, 151, 0.1) 2px 2px 8px 3px,
    rgba(41, 41, 41, 0.3) 5px 10px 13px -3px,
    rgba(0, 0, 0, 0.5) 0px -3px 0px inset;
  transition: all 0.15s ease-in-out;
  overflow: hidden;
  /* padding: 1.3rem; */
  display: grid;
  justify-content: center;
  /* grid-template-rows: 80% 10% */
  /* border-radius: 20%; */
}

.card-bs {
  box-shadow: rgba(151, 151, 151, 0.1) 2px 2px 8px 3px,
    rgba(41, 41, 41, 0.3) 5px 10px 13px -3px,
    rgba(0, 0, 0, 0.5) 0px -3px 0px inset;
}

.rec-details {
  text-align: center;
  padding: 10px 20px;
  background-color: blueviolet;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: fit-content; */
}

img {
  max-width: 250px;
  /* max-width: 400px; */
  width: 200px;
  height: 200px;
  object-fit: cover;
  height: auto;
  justify-self: center;
  align-self: center;
}

#prod-title {
  font-size: 0.9rem;
  font-weight: bold;
}

#prod-price {
  font-size: 0.7rem;
  font-weight: bold;
}

.onHover {
  box-shadow: 0;
  box-shadow: rgba(151, 151, 151, 0.1) 2px 4px 10px,
    rgba(41, 41, 41, 0.3) 6px 13px 30px 2px,
    rgba(0, 0, 0, 0.5) 0px -3px 0px inset;
  scale: 1.015;
}

.onPress {
  height: 70%;
  width: 30%;
}

.recAni-enter-active,
.recAni-leave-active {
  transition: all 3s ease;
}

.recAni-enter-from,
.recAni-leave-to {
  opacity: 0.3;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50rem;
}

.loading-text {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

/* JUMP */
h2 {
  cursor: default;
  text-align: center;
}

h2 span {
  position: relative;
  top: 20px;
  /* display: inline-block; */
  animation: bounce 0.3s ease infinite alternate;
  font-size: 1.2rem;
  color: #363632;
  text-shadow: 5px 5px 0px #ffb650, 10px 10px 0px #ffd662, 15px 15px 0px #ff80bf,
    20px 20px 0px #ef5097, 25px 25px 0px #6868ac, 30px 30px 0px #90b1e0;
}

h2 span:nth-child(2) {
  animation-delay: 0.1s;
}

h2 span:nth-child(3) {
  animation-delay: 0.2s;
}

h2 span:nth-child(4) {
  animation-delay: 0.3s;
}

h2 span:nth-child(5) {
  animation-delay: 0.4s;
}

h2 span:nth-child(6) {
  animation-delay: 0.5s;
}

h2 span:nth-child(7) {
  animation-delay: 0.6s;
}

h2 span:nth-child(8) {
  animation-delay: 0.2s;
}

h2 span:nth-child(9) {
  animation-delay: 0.3s;
}

h2 span:nth-child(10) {
  animation-delay: 0.4s;
}

h2 span:nth-child(11) {
  animation-delay: 0.5s;
}

h2 span:nth-child(12) {
  animation-delay: 0.6s;
}

h2 span:nth-child(13) {
  animation-delay: 0.7s;
}

h2 span:nth-child(14) {
  animation-delay: 0.8s;
}

/* ANIMATION */
@keyframes bounce {
  100% {
    top: -20px;
    text-shadow: 0 1px 0 #ccc, 0 2px 0 #ccc, 0 3px 0 #ccc, 0 4px 0 #ccc,
      0 5px 0 #ccc, 0 6px 0 #ccc, 0 7px 0 #ccc, 0 8px 0 #ccc, 0 9px 0 #ccc,
      0 50px 25px rgba(0, 0, 0, 0.2);
  }
}
</style>
