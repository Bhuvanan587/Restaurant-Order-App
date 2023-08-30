import { menuArray } from "/data.js";
const subcontainer = document.getElementById('subcontainer')

function getMenu(arr) {


    return arr.map(function (obj) {
        const { name, ingredients, id, price, emoji } = obj
        return `
        <div class="foodItem">
        <div class="emoji">${emoji}</div>
        <div class="info">
        <h2>${name}</h2>
        <p>${ingredients}</p>
        <h4>$${price}</h4>
        </div>
        <button class="addBtn" data-price="${price}" data-name="${name}" data-id="${id}">+</button>
        </div>
        `}).join('')
}

document.getElementById('menu').innerHTML = getMenu(menuArray)


let checkoutTitleAdded = false;
let priceadded = false;
let totalPrice = 0;

function renderCheckout(obj) {
    let checkoutString = '';
    
    // Add checkout title only if not added yet
    if (!checkoutTitleAdded) {
        checkoutString += '<h2 class="checkout-title">Your Order</h2>';
        checkoutTitleAdded = true;
    }
    
    // Add the item details
    checkoutString += `
        <div class="cartItem" id="cartItem">
        <div class="nameEl">
        <h2>${obj.name}</h2>
        <button class="removeBtn" id="removeBtn">remove</button>
        </div>
        <div>
        <h4>$${obj.price}</h4>
        </div>
        </div>
    `
    
    return checkoutString;
}

function renderPrice(price){
    let priceString = ''

    
        priceString += `
        <div class="price-info">
        <h2>Total Price</h2>
        <h4>$${price}</h4>
        </div>
        <button class="purchase-btn" id="purchaseBtn">Complete order</button>`;
         

    return priceString
}

function renderModal(){
    const modal = document.querySelector('.modal')
            purchaseBtn.addEventListener('click', () => {
                if (totalPrice > 0) {
                    // Show the modal when the purchase button is clicked and the total price is greater than 0
                    modal.style.display = 'flex';
                }
            });
}

function finalPay() {
    const modal = document.querySelector('.modal');
    const username = document.getElementById('modal-name');
    const cardNumber = document.getElementById('modal-cardNo');
    const cvv = document.getElementById('modal-cvv');
    const payBtn = document.getElementById('payBtn');
    const subcontainer = document.querySelector('.subcontainer');

    payBtn.addEventListener('click', () => {
        let thankString = `
        <div class="thanks-card">
        Thanks, ${username.value}! Your order is on its way!
        </div>`;

        subcontainer.innerHTML = thankString;
        modal.style.display = 'none';

        // Clear input fields
        username.value = '';
        cardNumber.value = '';
        cvv.value = '';
    });
}


document.addEventListener('click', (e) => {
    // Handle add button click
    if (e.target.dataset.id) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cartItem';
        cartItem.dataset.id = e.target.dataset.id;

        const nameEl = document.createElement('div');
        nameEl.className = 'nameEl';
        nameEl.innerHTML = `
            <h2>${e.target.dataset.name}</h2>
            <button class="removeBtn" data-rmv="yes">remove</button>
        `;

        const priceEl = document.createElement('div');
        priceEl.innerHTML = `<h4>$${e.target.dataset.price}</h4>`;

        cartItem.appendChild(nameEl);
        cartItem.appendChild(priceEl);

        document.getElementById('checkout').appendChild(cartItem);

        totalPrice += Number(e.target.dataset.price);
        document.getElementById('totalPrice').innerHTML = renderPrice(totalPrice);

        const purchaseBtn = document.getElementById('purchaseBtn');
        purchaseBtn.disabled = totalPrice <= 0; // Disable if totalPrice is 0 or less
        purchaseBtn.style.display = totalPrice <= 0 ? 'none' : 'block'

        renderModal()
        finalPay()
    }

    // Handle remove button click using event delegation
    if (e.target.classList.contains('removeBtn')) {
        const cartItem = e.target.closest('.cartItem');
        if (cartItem) {
            const removedPrice = Number(cartItem.querySelector('h4').textContent.slice(1));
            totalPrice -= removedPrice;
            document.getElementById('totalPrice').innerHTML = renderPrice(totalPrice);
            cartItem.remove();

            const purchaseBtn = document.getElementById('purchaseBtn');
            purchaseBtn.disabled = totalPrice <= 0; // Disable if totalPrice is 0 or less
            purchaseBtn.style.display = totalPrice <= 0 ? 'none' : 'block'

            renderModal()
            finalPay()
        }
    }
});