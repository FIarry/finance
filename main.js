const addBtn = document.getElementById('addBtn')
const chart = document.querySelector('.chart')
const tbody = document.getElementById('tbody')

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (isNaN(document.getElementById('pPrice').value)) {} else {
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
    
    
            iC.addEventListener('click', (e) => {
                purchase.remove()
                update()
            })
        }
        update()
    }
})

function update() {
    let FinalValue = 0
    let categoriesValue = []
    let categories
    // for (let tableBody of tbody.children) {
    //     let price = tableBody.querySelector('.price')
    //     let category = tableBody.querySelector('.category')
    //     FinalValue = + price.textContent
    //     if (categoriesValue.includes(category)) {} else {
    //         categoriesValue.push(category)
    //         let index = categoriesValue.length - 1
    //         categoriesValue[index] = 
    //     }
    // }
}