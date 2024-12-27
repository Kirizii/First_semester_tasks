"use strict"

const EventEmitter = require('events');

class User {
    constructor(name, eventEmitter) {
        this.name = name;
        this.eventEmitter = eventEmitter;
        this.eventEmitter.on('message', ({ user, message }) => {
            if (user !== this.name) {
                console.log(`[${this.name}] Отримав повідомлення від [${user}]: ${message}`);
            }
        });
    }

    sendMessage(message) {
        this.eventEmitter.emit('message', { user: this.name, message });
    }
}

const chatEventEmitter = new EventEmitter();

const kostya = new User('Kostya', chatEventEmitter);
const maks = new User('Maks', chatEventEmitter);
const sasha = new User('Sasha', chatEventEmitter);

kostya.sendMessage('Привіт усім');
maks.sendMessage('Привіт');
sasha.sendMessage('Доброго дня всім');
