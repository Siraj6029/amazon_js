import { formateCurrency } from "../scripts/utils/money.js";

console.log("test suite: formateCurrency")

console.log("converts cents into dollars")
if (formateCurrency(2095) === "20.95") {
    console.log("passed");
} else {
    console.log("failed");
};


console.log("work with 0")
if (formateCurrency(0) === "0.00") {
    console.log("passed")
} else {
    console.log("failed")
};


console.log("rounds up to nearest cent")
if (formateCurrency(2000.5) === "20.01") {
    console.log("passed");
} else {
    console.log("failed");
};


console.log("rounds down to nearest cent")
if (formateCurrency(2000.4) === "20.00") {
    console.log("passed");
} else {
    console.log("failed");
};