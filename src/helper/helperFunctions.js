export const sidebarJS = () => {
  var btn = document.querySelector(".toggle");
  var btnst = true;
  btn.onclick = function () {
    if (btnst == true) {
      document.querySelector(".toggle span").classList.add("toggle");
      document.getElementById("sidebar").classList.add("sidebarshow");
      btnst = false;
    } else if (btnst == false) {
      document.querySelector(".toggle span").classList.remove("toggle");
      document.getElementById("sidebar").classList.remove("sidebarshow");
      btnst = true;
    }
  };
};

export const calculatePercentage =(part, whole)=>{
  return (part / whole) * 100;
}

// export const  platfromTimmer=(startTime)=> {
//   console.log(startTime,"startTime");
 
//   let interval = setInterval(function() {
//     let currentTime = new Date();
//     let elapsedTime = currentTime - startTime;
//     let days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24))
//     let hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//     let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
//     let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
//     console.log(days + "d " + hours + 'h '+ minutes + "m " + seconds + "s");
//   }, 1000);


// }
