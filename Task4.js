const fs = require("fs");

async function* randomNumberGenerator() {
    while (true) {
        const randomNumber = Math.floor(Math.random() * 100);
        yield randomNumber;
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
}