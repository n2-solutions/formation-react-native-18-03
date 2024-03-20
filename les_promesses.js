// les promesses
// Une promesse est un object javascript representant une action asynchrone.
// une promesse a 3 etats : en attente, resolue, ou rejetée.

let stockTomates = 3;

const faireUnePizza = (type) => {
  return new Promise((resolve, reject) => {
    if (stockTomates > 2) {
      // je coupe les tomates
      stockTomates = stockTomates - 2;

      // je lance la cuisson
      setTimeout(() => {
        console.log("La pizza est prete");
        const pizza = { type: type };
        resolve(pizza);
      }, 3000);
    } else {
      reject("desole apu tomate");
    }
  });
};

// faireUnePizza("anchois")
//   .then((maPizza) => {
//     console.log("trop bien ma pizza est prete", maPizza);
//   })
//   .catch((error) => {
//     console.log("désole, jai pas pu faire la pizza car : ", error);
//   });

// faireUnePizza("reine")
//   .then((maPizza) => {
//     console.log("trop bien ma pizza est prete", maPizza);
//   })
//   .catch((error) => {
//     console.log("désole, jai pas pu faire la pizza car : ", error);
//   });

async function commanderMesPizzas() {
  const anchois = await faireUnePizza("anchois");
  const reine = await faireUnePizza("reine");
}

function commanderMesPizzas() {
  faireUnePizza("anchois").then((pizza) => {
    console.log("ma pizza est la :", pizza);
    faireUnePizza("reine").then((pizza) => {
      console.log("ma pizza est la :", pizza);
    });
  });
}

commanderMesPizzas();
