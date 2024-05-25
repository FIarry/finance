const addBtn = document.getElementById('addBtn')
const chart = document.querySelector('.chart')
const tbody = document.getElementById('tbody')
const legList = document.querySelector(".legend__list")
const price = document.getElementById('finalPrice')

let categories = []
let values = []

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (isNaN(document.getElementById('pPrice').value)) { } else {
        let same = false
        for (let tableBody of tbody.children) {
            let name = tableBody.querySelector('.name')
            let price = tableBody.querySelector('.price')
            if (name.textContent.toLowerCase() == document.getElementById('pName').value.toLowerCase()) {
                same = true
                price.textContent = Number(price.textContent) + Number(document.getElementById('pPrice').value)
            }
        }
        if (same == false) {
            let purchase = document.createElement('tr')
            purchase.classList.add('purcashes__item', 'purcashes__row')
            tbody.append(purchase)
            let iC = document.createElement("i")
            iC.classList.add('purcashes__item-del', 'fa-solid', 'fa-xmark')
            let categoryTrue = document.getElementById('selectCategory').value
            for (let tableBody of tbody.children) {
                for (let child of tableBody.children) {
                    if (child.textContent.toLowerCase() == document.getElementById('selectCategory').value.toLowerCase()) {
                        categoryTrue = child.textContent
                    }
                }
            }
            let name = document.createElement("td"); name.textContent = document.getElementById('pName').value; name.classList.add('name')
            let category = document.createElement("td"); category.textContent = categoryTrue; category.classList.add('category')
            let price = document.createElement("td"); price.textContent = document.getElementById('pPrice').value; price.classList.add('price')
            let cross = document.createElement("td"); cross.append(iC)
            purchase.append(name);
            purchase.append(category);
            purchase.append(price);
            purchase.append(cross)
            let added = false
            for (let cat of categories) {
                if (cat == category.textContent) {
                    added = true
                }
            }
            if (added == false) {
                categories.push(category.textContent)
                values.push(0)
            }


            iC.addEventListener('click', (e) => {
                purchase.remove()
                let catIndex = getAllIndexes(categories, category.textContent);
                values.splice(catIndex)
                categories.splice(catIndex)
                update()
            }, { once: true })
        }
        update()
    }
})

function update() {
    let FinalValue = 0
    for (let val of values) { // перебор данных
        let valIndex = getAllIndexes(values, val); // очистка
        values[valIndex] = 0
    }
    while (legList.childNodes.length > 0) {
        legList.removeChild(legList.childNodes[legList.childNodes.length - 1])
    }

    for (let tableBody of tbody.children) { // получает элемент в таблице
        let price = tableBody.querySelector('.price')
        let category = tableBody.querySelector('.category').textContent
        FinalValue += +price.textContent // добавление к итогу
        for (let cat of categories) { // перебор категорий
            if (cat == category) {
                let catIndex = getAllIndexes(categories, cat); // находит индекс категории чтобы найти в списке данных
                values[catIndex] += Number(price.textContent) // изменение данных
            }
        }
    }

    for (let cat of categories) { // добавление элементов
        let legItem = document.createElement('li')
        legItem.setAttribute('data-category', cat)
        legItem.classList.add('legend__item')
        legItem.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
        legList.append(legItem)
        let catSpan = document.createElement('span')
        catSpan.classList.add('legend__category')
        catSpan.textContent = cat
        legItem.append(catSpan)
        let prSpan = document.createElement('span')
        prSpan.classList.add('legend__price')
        let catIndex = getAllIndexes(categories, cat);
        prSpan.textContent = values[catIndex]
        legItem.append(prSpan)
    }
    price.textContent = FinalValue
}

function getAllIndexes(arr, val) {
    let indexes = [], i = -1;
    while ((i = arr.indexOf(val, i + 1)) != -1) {
        indexes.push(i);
    }
    return indexes;
}