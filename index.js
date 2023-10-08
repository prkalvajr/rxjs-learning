const { Observable } = require("rxjs");

const observable =  new Observable((subscriber) => {
    subscriber.next(10);
    subscriber.next(11);
    subscriber.next(12);
});

const observer = {
    next: (value) => {
        console.log("Observer got a value of " + value);
    },
    error: (error) => {
        console.log("Observer got an error of " + error);
    },
    complete: () => {
        console.log("Observer got a complete notification");
    }
}

observable.subscribe(observer);
