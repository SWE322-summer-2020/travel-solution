// const form = document
//   .querySelectorAll(".form")[2]
//   .addEventListener("submit", function(e) {
//     e.preventDefault();
//     const area = document.getElementById("area").value;
//     if (area) {
//       document.getElementById("spot").disabled = false;
//       document.getElementById("hotel").disabled = false;
//     }
//   });
const areas = [];

const forms = document.querySelectorAll(".form");
forms[0].addEventListener("submit", function(e) {
  e.preventDefault();
  if (area.length == 0) {
    return alert("please fill area spots");
  }
});

function getLocation(inputElement) {
  try {
    document
      .getElementById(`${inputElement}`)
      .addEventListener("input", async function(e) {
        e.preventDefault();
        let area = document.getElementById("area").value;
        area = area.trim();
        area = area.split(",");
        let query = area.map((el) => {
          let noSpace = el.trim();
          return noSpace;
        });
        query = query.join("%2C+");
        query = query.split(" ");
        query = query.join("+");
        let url = `https://www.google.com/maps/search/?api=1&query=${query}`;

        const res = await axios({
          method: "GET",
          url: url,
        });
        console.log(res);
      });
  } catch (error) {
    console.log(err);
  }
}

getLocation("area");
getLocation("spot");
