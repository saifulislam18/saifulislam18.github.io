import { onGetDatas, saveData, updateData } from "./firebase.js";

let carStatus = false;
let miniMapStatus = true;
const SEASON = ["summer", "autumn", "winter"];
let data = {};

window.addEventListener("DOMContentLoaded", async () => {
  populateData();
});

function populateData() {
  onGetDatas((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data = doc.data();
      data.id = doc.id;
      carStatus = data.status;
      miniMapStatus = data.showInspectionSection;
    });
    if (!data.id) {
      createARecord();
    }
    selectCar();
    selectSeason();
    changeCarActivity();
    changeMiniMapStatus();
  });
}

function selectCar() {
  const changeCar = document.querySelectorAll(".change-car");
  changeCar.forEach((btn, i) => {
    btn.addEventListener("click", async () => {
      if (data.id) {
        data.selectedCarIndex = i;
        try {
          await updateData(data.id, data);
        } catch (error) {
          console.log(error);
        }
      }
    });
    if (data.selectedCarIndex == i) {
      btn.classList.add("underline");
    } else {
      btn.classList.remove("underline");
    }
  });
}

function selectSeason() {
  const changeSeason = document.querySelectorAll(".change-season");
  changeSeason.forEach((btn, i) => {
    btn.addEventListener("click", async () => {
      if (data.id) {
        data.season = SEASON[i];
        try {
          await updateData(data.id, data);
        } catch (error) {
          console.log(error);
        }
      }
    });
    if (data.season == btn.innerText.toLowerCase()) {
      btn.classList.add("underline");
    } else {
      btn.classList.remove("underline");
    }
  });
}

function changeCarActivity() {
  const btn = document.querySelector(".change-car-activity");
  btn.addEventListener("click", async () => {
    if (data.id) {
      data.status = carStatus ? false : true;
      try {
        await updateData(data.id, data);
      } catch (error) {
        console.log(error);
      }
    }
  });
  if (carStatus) {
    btn.innerText = "Start Car";
    btn.style.background = "rgb(132, 204, 22)";
  } else {
    btn.innerText = "Stop Car";
    btn.style.background = "rgb(239, 68, 68)";
  }
}
function changeMiniMapStatus() {
  const btn = document.querySelector(".change-minimap");
  btn.addEventListener("click", async () => {
    if (data.id) {
      data.showInspectionSection = miniMapStatus ? false : true;
      try {
        await updateData(data.id, data);
      } catch (error) {
        console.log(error);
      }
    }
  });
  if (miniMapStatus) {
    btn.innerText = "Hide Mini Map";
    btn.style.background = "rgb(239, 68, 68)";
  } else {
    btn.innerText = "Show Mini Map";
    btn.style.background = "rgb(132, 204, 22)";
  }
}

async function createARecord() {
  try {
    await saveData({
      selectedCarIndex: 0,
      season: "summer",
      status: false,
      showInspectionSection: true,
    });
  } catch (error) {
    console.log(error);
  }
}
