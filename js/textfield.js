document.querySelectorAll('.material-textfield > input').forEach(function (input) { input.onchange(); });

/* 
 * Note that JavaScript is used in two places:
 * 1. In the onchange listener to signal whether the input is empty
 * 2. Here to update the empty signal in case of browser autofill
 *
 * The need of JavaScript comes from the lack of ability to detect emptiness of input with a dedicated CSS selector.
 */