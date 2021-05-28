document.addEventListener('DOMContentLoaded', () => {
    const phoneMask = () => {
        const phoneFields = document.querySelectorAll('input[data-input=phone]');
        const form = document.querySelector('form');
        const error = document.querySelector('.form__error');

        const inputValueToDigits = (input) => {
            return input.value.replace(/\D/g, "");
        }

        const onInput = (e) => {
            let input = e.target;
            let inputNumbers = inputValueToDigits(input);
            let selectionStart = input.selectionStart;
            let formattedInput = "";

            if (!inputNumbers) {
                return input.value = "";
            }

            if (input.value.length !== selectionStart) {
                if (e.data && /\D/g.test(e.data)) {
                    input.value = inputNumbers;
                } return;
            }

            if (["7", "8", "9"].indexOf(inputNumbers[0]) > -1) {
                if (inputNumbers[0] === '9') {
                    inputNumbers = "7" + inputNumbers;
                }
                let firstSymbols = inputNumbers[0] === "8" ? "8" : "+7";
                formattedInput = firstSymbols + " ";

                if (inputNumbers.length > 1) {
                    formattedInput += "(" + inputNumbers.substring(1, 4);
                }
                if (inputNumbers.length >= 5) {
                    formattedInput += ') ' + inputNumbers.substring(4, 7);
                }
                if (inputNumbers.length >= 8) {
                    formattedInput += '-' + inputNumbers.substring(7, 9);
                }
                if (inputNumbers.length >= 10) {
                    formattedInput += '-' + inputNumbers.substring(9, 11);
                }
            } else {
                formattedInput = "+" + inputNumbers.substring(0, 16);
            }

            error.innerHTML = "";
            e.currentTarget.classList.remove('error');

            input.value = formattedInput;
        }

        const onPaste = (e) => {
            let input = e.target,
                inputNumbersValue = inputValueToDigits(input);
            let pasted = e.clipboardData || window.clipboardData;

            if (pasted) {
                let pastedText = pasted.getData('Text');
                if (/\D/g.test(pastedText)) {
                    return input.value = inputNumbersValue;
                }
            }
            e.currentTarget.classList.remove('error');
        }

        const onKeyDown = (e) => {
            let inputValue = e.target.value.replace(/\D/g, '');
            if (e.keyCode === 8 && inputValue.length === 1) {
                e.target.value = "";
            }
            error.innerHTML = "";
            e.currentTarget.classList.remove('error');
        }

        const validate = (input) => {
            return input.length >= 11
        }

        const onSubmit = (e) => {
            e.preventDefault();
            const input = e.currentTarget[0].value;
            let phoneFormatted = input.replace(/\D/g, "");

            if (!validate(phoneFormatted)) {
                e.currentTarget[0].classList.add('error');
                error.innerHTML = "Please type the correct phone number";
                return;
            }

            if (phoneFormatted[0].indexOf("8") > -1) {
                phoneFormatted = phoneFormatted.replace("8", "7");
            }

            const inputData = {
                phone: Number(phoneFormatted),
                length: phoneFormatted.length
            }
            console.log("%c Phone number normalized for backend:", "background: #222; color: #bada55", Number(phoneFormatted));
            console.log("%c Number of digits:", "background: #222; color: #bada55", phoneFormatted.length);
            console.log("You can receive data as normalized string or as object with custom fields.");

            alert(`Form submitted, please check console for details. Phone number normalized for backend: ${JSON.stringify(inputData)}`);

            e.currentTarget[0].value = "";
            return inputData;
        }

        for (let phoneInput in phoneFields) {
            if (!phoneFields.hasOwnProperty(phoneInput)) continue;
            let input = phoneFields[phoneInput];
            input.addEventListener('input', onInput, false);
            input.addEventListener('input', onPaste, false);
            input.addEventListener('input', onKeyDown, false);
        }

        form.addEventListener('submit', onSubmit);
    };

    phoneMask();
});