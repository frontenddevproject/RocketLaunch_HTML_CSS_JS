const startBtn = document.querySelector("#start");
const prepareBtn = document.querySelector("#prepare");
const resetBtn = document.querySelector("#reset");
const rocketImage = document.querySelector(".image");
const visualBlock = document.querySelector(".visual-content");

let timer = 0;

class RocketLauncher {
   constructor(fuelQuantity, checkSystems) {
      this.fuelQuantity = fuelQuantity;
      this.checkSystems = checkSystems;
   }
 
   rocketPreparation () {
      this.fuelQuantity = 0;
      this.rocketRefueling();

      const fuel = document.querySelector(".fuel");
      const fuelCounter = document.querySelector(".fuel-counter");
      const textBlock = document.querySelector(".text-block");

      textBlock.innerHTML = "";

      timer = setInterval( () => {
               console.log(`${this.fuelQuantity} %`);
               this.fuelQuantity += 10; 
               
               fuelCounter.textContent = `${this.fuelQuantity} %`;
               fuel.style.width = `${this.fuelQuantity}%`;

               if (this.fuelQuantity === 50) {
                  fuelCounter.style.color = "#fff";
               }    

               if (this.fuelQuantity === 100) {
                  clearInterval (timer);

                  textBlock.innerHTML = "<h2>Checking of the rocket systems</h2>"
   
                  setTimeout(() => {
                     this.checkOfFuelSystem(textBlock).checkOfControlSystem(textBlock).checkOfCoolingSystem(textBlock);
                     console.log(this);
                  
                     if (this.checkSystems.every((el) => el === true)) {
                        textBlock.innerHTML += "<h2>Press START to launch the rocket</h2>"
                        startBtn.removeAttribute("disabled");
                        startBtn.style.background = "green"
                     } else {
                        console.log ("Start is not possible, not all systems are ready");
                        }
                  }, 2000);

                  return this;
               }
            }, 500);
   }

   rocketRefueling () {
      visualBlock.innerHTML = "";
      visualBlock.innerHTML = `
      <h2> The fuel level in the rocket tanks</h2> 
      <div class="refueling-animation">
         <div class="fuel-counter"></div>
         <div class="fuel"></div>
      </div>
      <div class="text-block"></div>
      `;
      const refueling = document.querySelector(".refueling-animation");
      refueling.classList.add("refueling-tank");
   }

   checkOfFuelSystem(text) {
      this.checkSystems = [];    
      if ( this.fuelQuantity === 100) {
         text.innerHTML = "<h3>The rocket fuel tanks are fulled</h3>";
         text.innerHTML += "<h3>The FUEL system is ready</h3>";
         console.log("The Fuel tanks are fulled");
         console.log("The FUEL system is ready");
         this.checkSystems.push(true);
      } else {
         console.log("Alarm");
         this.checkSystems.push(false);
      }

      return this;
   } 

   checkOfControlSystem(text) {
      text.innerHTML += "<h3>The CONTROL system is ready</h3>";
      console.log("The CONTROL system is ready");
      this.checkSystems.push(true);

      return this;
   }

   checkOfCoolingSystem (text) {
      text.innerHTML += "<h3>The COOLING system is ready</h3>";
      console.log("The COOLING system is ready");
      this.checkSystems.push(true);

      return this;
   }
}

const falconHeavy = new RocketLauncher();

startBtn.setAttribute("disabled", "disabled");

startBtn.onclick = () => {
   rocketImage.style.transition = "4s";
   rocketImage.style.bottom = "120%";
   startBtn.setAttribute("disabled", "disabled");
   startBtn.style.background = "inherit";
   visualBlock.innerHTML += "<h2>CONGRATULATIONS! The rocket has been launching successfully!</h2>";
}

prepareBtn.onclick = () => {
  falconHeavy.rocketPreparation();
  prepareBtn.setAttribute("disabled", "disabled");
}

resetBtn.onclick = () => {
   window.location.reload();
}