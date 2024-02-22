"use strict";

const gooods = {
    milk: {
        description:
            " питательная жидкость, вырабатываемая молочными железами самок млекопитающих во время лактации. Естественное назначение молока — вскармливание[2] потомства (в том числе и у человека), которое ещё не способно переваривать другую пищу. В настоящее время молоко входит в состав многих продуктов, используемых человеком, а его производство стало крупной отраслью промышленности.",
        characteristics: {
            weight: 1000,
            height: 30,
            width: 15,
            price: 63,
        },
    },
    sugar: {
        description:
            " распространённый продовольственный товар. Основной компонент сахара — сахароза. Но кроме неё продукт может содержать различные примеси. В белом сахаре допускается их содержание до 0,25 %, в рафинированном — до 0,1 %.",
        characteristics: {
            weight: 80,
            height: 15,
            width: 35,
            price: 50,
        },
    },
    cola: {
        description:
            "тип газированных безалкогольных напитков с добавлением натуральных или искусственных ароматизаторов — ванили, корицы, цитрусовых масел и других ароматизаторов. Кола стала популярной во всём мире после того, как фармацевт Джон Пембертон в 1886 году изобрёл торговую марку Coca-Cola, которой позже подражали другие производители. Большинство напитков типа колы содержат кофеин, который первоначально был получен из ореха колы, что привело к названию напитка, хотя в настоящее время используются и другие источники. Оригинальный напиток «кола» от Пембертона также содержал кокаин из листьев коки[2][3]. Его безалкогольный рецепт был вдохновлён вином из коки фармацевта Анджело Мариани, созданным в 1863 году",
        characteristics: {
            weight: 900,
            height: 35,
            width: 20,
            price: 99,
        },
    },
    pizza: {
        description:
            "традиционное итальянское блюдо, изначально в виде круглой дрожжевой лепёшки, выпекаемой с уложенной сверху начинкой из томатного соуса, сыра и зачастую других ингредиентов, таких как мясо, овощи, грибы и прочие продукты. Небольшую пиццу иногда называют пиццеттой. Повар, специализирующийся на приготовлении пиццы, — пиццайоло.",
        characteristics: {
            weight: 2000,
            height: 35,
            width: 5,
            price: 450,
        },
    },
};

const gloceryListUL = document.querySelectorAll(".glocery-list > ul");
const goodsInfo = document.querySelector(".tab");

let eventLiElem = "";

gloceryListUL[0].addEventListener("click", (event) => {
    eventLiElem = event.target.textContent.toLowerCase();
    if (event.target.className === "delete") {
        event.target.parentElement.remove();
    }
    if (
        event.target.classList.contains("item") ||
        event.target.tagName === "LI"
    ) {
        goodsInfo.classList.remove("hidden1", "hidden2");
    }
});

const addItem = document.forms["add-item"];

addItem.addEventListener("submit", (event) => {
    event.preventDefault();

    const valueInfo = addItem.querySelector('input[type="text"]').value;
    if (valueInfo === "") {
        return;
    } else {
        let itemLi = document.createElement("li");
        itemLi.innerHTML = `
			<span class="item">${valueInfo}</span>
			<span class="delete">delete</span>
		`;
        gloceryListUL[0].append(itemLi);
        addItem.reset();
        document.querySelector(".windowinfo")?.remove();
        goodsInfo?.remove();
    }
});

const checkList = document.forms["search-item"];
const checked = checkList.querySelector('#check input[type="checkbox"');

checked.addEventListener("change", () => {
    if (!gloceryListUL[0].hasAttribute("class")) {
        gloceryListUL[0].classList.add("hidden1", "hidden2");
    } else {
        gloceryListUL[0].removeAttribute("class");
    }
});

let search = checkList.querySelector('#search-item input[type="text"]');

checkList.addEventListener("submit", (event) => {
    event.preventDefault();
});

search.addEventListener("keyup", (event) => {
    let liText = gloceryListUL[0].querySelectorAll("li");
    let eventValue = event.target.value.toLowerCase();
    if (eventValue.length >= 2) {
        let checkItem = Array.from(liText).findIndex((item) =>
            item
                .querySelectorAll("span")[0]
                .textContent.toLocaleLowerCase()
                .includes(eventValue)
        );

        if (checkItem >= 0) {
            let selectionItems = Array.from(liText).filter(
                (index, i) =>
                    !index
                        .querySelectorAll("span")[0]
                        .textContent.toLocaleLowerCase()
                        .includes(eventValue)
            );

            selectionItems.forEach((item, i) => {
                item.classList.add("hidden1", "hidden2");
            });
        } else {
            liText.forEach((item, i) => {
                item.classList.remove("hidden1", "hidden2");
            });
        }
    } else {
        liText.forEach((item, i) => {
            item.classList.remove("hidden1", "hidden2");
        });
    }
});

let count = 0;

goodsInfo.addEventListener("click", (event) => {
    if (document.querySelector(".windowinfo")) {
        document.querySelector(".windowinfo").remove();
        count--;
    }
    if (event.target.classList.contains("description") && count === 0) {
        let elem = document.createElement("div");
        elem.classList.toggle("windowinfo");
        goodsInfo.after(elem);
        count++;
        let descr = "";
        for (let [key, value] of Object.entries(gooods)) {
            let checkKey = eventLiElem.includes(key);
            if (checkKey) {
                descr = value.description;
            }
        }

        let descriptionElem = document.createElement("p");
        if (!descr) {
            descriptionElem.textContent = `Описание отсутствует`;
            elem.append(descriptionElem);
        } else {
            descriptionElem.textContent = descr;
            elem.append(descriptionElem);
        }

        setTimeout(() => {
            let closewindow = document.querySelector(".windowinfo");
            closewindow.addEventListener("click", (event) => {
                event.target.remove();
                goodsInfo.classList.add("hidden1", "hidden2");
                count--;
            });
        }, 1000);
    }

    if (event.target.classList.contains("characteristics") && count === 0) {
        let elem = document.createElement("div");
        elem.classList.toggle("windowinfo");
        goodsInfo.after(elem);
        count++;
        let char = "";
        for (let [key, value] of Object.entries(gooods)) {
            let checkKey = eventLiElem.includes(key);
            if (checkKey) {
                char = value.characteristics;
            }
        }

        let descriptionElem = document.createElement("p");
        if (!char) {
            descriptionElem.textContent = `Описание отсутствует`;
            elem.append(descriptionElem);
        } else {
            descriptionElem.textContent = `Ширина: ${char.width}\n
									   Цена: ${char.price}\n
									   Высота: ${char.height}\n
									   Вес: ${char.weight}\n
									   `;
            elem.append(descriptionElem);
        }

        setTimeout(() => {
            let closewindow = document.querySelector(".windowinfo");
            closewindow.addEventListener("click", (event) => {
                event.target.remove();
                goodsInfo.classList.add("hidden1", "hidden2");
                count--;
            });
        }, 1000);
    }
});
