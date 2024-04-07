function addDisplay(value) {
    document.getElementById("answer").value += value;
}

function clearDisplay() {
    document.getElementById("answer").value = "";
}
function calculate() {
    var expression = document.getElementById("display").value;
        var parts = expression.split("+");
        var sum = 0;
        for (var i = 0; i < parts.length; i++) {
            try {
                sum += eval(parts[i]);
            } catch (error) {
                document.getElementById("display").value = "Error";
                return;
            }
        }
        document.getElementById("display").value = sum;
}