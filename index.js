document.addEventListener('DOMContentLoaded', () => {
    const phoneMask = () => {
        let phoneFields = document.querySelectorAll('input[data-input=phone]');

        const inputValueToDigits = function (input) {
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
            input.value = formattedInput;
        }

        const onPaste = function (e) {
            let input = e.target,
                inputNumbersValue = inputValueToDigits(input);
            let pasted = e.clipboardData || window.clipboardData;

            if (pasted) {
                let pastedText = pasted.getData('Text');
                if (/\D/g.test(pastedText)) {
                    return input.value = inputNumbersValue;
                }
            }
        }

        const onKeyDown = function (e) {
            let inputValue = e.target.value.replace(/\D/g, '');
            if (e.keyCode === 8 && inputValue.length === 1) {
                e.target.value = "";
            }
        }

        for (let phoneInput in phoneFields) {
            if (!phoneFields.hasOwnProperty(phoneInput)) continue;
            let input = phoneFields[phoneInput];
            input.addEventListener('input', onInput, false);
            input.addEventListener('input', onPaste, false);
            input.addEventListener('input', onKeyDown, false);
        }
    };

    phoneMask();
});