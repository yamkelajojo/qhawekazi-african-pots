<template>
  <div class="thaBody">
    <div v-if="isModalOn" class="">
      <div class="modal-bg" @click.self="closeModal">
        <div class="modal">
          <div
            class="close-btn-div"
            ref="close-icon"
            @click="closeModal"
            @mouseenter="closeBtnHoverEnter"
            @mouseleave="closeBtnhoverLeave"
          >
            <Icon
              name="majesticons:close-circle-line"
              size="1.3rem"
              :color="closeIconColor"
            />
          </div>
          <div>
            <img :src="modalImage" alt="" />
          </div>
          <div>
            <h3>{{ modalTitle }}</h3>
            <h4>${{ modalPrice }}</h4>
            <p>{{ modalDesc }}</p>
          </div>
          <h4></h4>
        </div>
      </div>
    </div>
    <div class="">
      <header>
        <nav>
          <Transition name="headerAni" appear>
            <h1>QAP</h1>
          </Transition>
        </nav>
      </header>
      <main>
        <Recipe @productSelected="onProductSelected" />
      </main>
      <footer class="py-def">
        <p>&copy; 2023 Dojo. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const isModalOn = ref(false);
let modalImage = ref(null);
let modalTitle = ref(null);
let modalPrice = ref(null);
let modalDesc = ref(null);
let closeIconColor = ref("gray");
const route = useRoute().params;

const onProductSelected = (product) => {
  isModalOn.value = !isModalOn.value;
  modalImage = product["image"];
  modalTitle = product["title"];
  modalPrice = product["price"];
  modalDesc = product["description"];

  // route.value.push(modalTitle.value);
  console.log(route.params);
  console.log(route.value);
  console.log(route);
};

const closeBtnHoverEnter = () => {
  if (closeIconColor.value == "gray") {
    closeIconColor.value = "red";
  }
};

const closeBtnhoverLeave = () => {
  if (closeIconColor.value == "red") {
    closeIconColor.value = "gray";
  }
};

const closeModal = () => {
  if (isModalOn.value === true) {
    isModalOn.value = false;
  }
};
</script>

<style>
@font-face {
  font-family: "Calligraffitti", cursive;
  src: url("https://fonts.googleapis.com/css2?family=Baloo+Chettan+2&family=Calligraffitti&display=swap")
    format("truetype");
}

.thaBody {
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  text-align: center;
  /* background-color: antiquewhite; */
  width: 100%;
  font-size: 5rem;
  box-shadow: 0px 4px 6px rgba(151, 151, 151, 0.1);
  padding: 0.1rem 0 1.8rem;
}

header h1 {
  font-family: "Calligraffitti", cursive;
  font-weight: 700;
  font-size: 5.1rem;
  text-shadow: -15px 5px 20px #ced0d3;
  letter-spacing: 0.02em;
  color: #363632;
  text-shadow: 5px 5px 0px #ffb650, 10px 10px 0px #ffd662, 15px 15px 0px #ff80bf,
    20px 20px 0px #ef5097, 25px 25px 0px #6868ac, 30px 30px 0px #90b1e0;
}

main {
  flex: 1;
  min-width: 100%;
}

footer {
  width: 100%;
  text-align: center;
  box-shadow: 0px -4px 6px rgba(151, 151, 151, 0.1);
  font-size: 0.6rem;
}

.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* this creates a semi-transparent black background */
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  padding: 20px;
  max-width: 60%;
  max-height: 71%;
  max-width: 580px;
  min-height: 500px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  padding: 2.75rem;
  gap: 1rem;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: #c0c0c0 #f0f0f0;
}

.close-btn-div {
  display: flex;
  position: absolute;
  top: 1.7%;
  right: 1.9%;
}

.modal::-webkit-scrollbar {
  width: 7px;
  margin-right: 20px;
}

.modal::-webkit-scrollbar-track {
  background-color: #c0c0c0;
  /* background-color: #d1d1d1; */

  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}

.modal::-webkit-scrollbar-thumb {
  /* background-color: #5b00c3; */
  background-image: linear-gradient(
    to bottom,
    #5b00c3 35%,
    #ffb650,
    #ffd662,
    #ff80bf,
    #ef5097,
    #6868ac,
    #90b1e0
  );

  border-radius: 5px;
}
</style>
