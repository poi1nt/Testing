import './widget.css';

class CreditCardValidator {

    addWidget() {
        let block_ccv = document.createElement('div');
        block_ccv.classList.add('credit_card_validator');
        block_ccv.innerHTML = `
            <div class="images">
                <div class="image_card visa no-active" id="4"></div>
                <div class="image_card ms no-active" id="5"></div>
                <div class="image_card mir no-active" id="2"></div>
                <div class="image_card jcb no-active" id="3"></div>
            </div>
            </div>
            <div class="form_group">
                <input class="input" id="InputNumber" type="number" placeholder="Credit card number">
                <button class="button" id="buttonValid">
                    Click to validate
                </button>
            </div>`;
        document.querySelector('.content').append(block_ccv);
    }

    checkPaymentSystem() {
        let inputField = document.getElementById("InputNumber");
        inputField.addEventListener("input", function() {
            let inputValue = inputField.value;
            if (inputValue.length == 1) {
                let firstDigit = parseInt(inputValue[0]);
                let card = document.getElementById(`${firstDigit}`)
                if (card != null) {
                    card.classList.remove('no-active')
                    console.log(card)
                }
            }
            if (inputValue.length < 1) {
                let elements = document.getElementsByClassName("image_card");
                for (let i = 0; i < elements.length; i++) {
                    if (!elements[i].classList.contains('no-active')) {
                        elements[i].classList.add('no-active')
                    }
                }
                }
            })
        }

    luna(inputValue) {
        if (inputValue.length > 0) {
            inputValue = inputValue.toString();
            let sum = 0;
            const parity = inputValue.length % 2;
            for (let i = 0; i < inputValue.length; i++) {
                let digit = Number(inputValue[i]);
                if (i % 2 === parity) {
                    digit *= 2;
                    if (digit > 9) {
                        digit -= 9;
                    }
                }
                sum += digit;
            }
            const isValid = sum % 10 === 0;

            return isValid;

        }
    }

    buttonClick() {
        let button = document.getElementById("buttonValid");
        let inputValue = document.getElementById('InputNumber');

        button.addEventListener('click', function() {
            if (this.luna(inputValue.value)) {

                alert('Valid credit card number!');
            } else {
                alert('Invalid credit card number!');
            }
        }.bind(this));
    }


}

export { CreditCardValidator };




