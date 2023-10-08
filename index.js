const { Observable } = require("rxjs");
const { map, filter } = require("rxjs/operators");

const users = {
    data: [
        {
            status: "active",
            age: 14
        },
        {
            status: "inactive",
            age: 32
        },
        {
            status: "active",
            age: 53
        },
        {
            status: "active",
            age: 17
        },

        {
            status: "active",
            age: 11
        },
        {
            status: "inactive",
            age: 43
        },
        {
            status: "inactive",
            age: 23
        }
    ]
}

const observable =  new Observable((subscriber) => {
    subscriber.next(users);
    subscriber.complete();
}).pipe(
    map((value) => {
        console.log("First operator - data received: ", value);
        return value.data;
    }),
    filter((value) => value.length >= 5),   // won't emmit data if condition is not satisfied
    map((value) => {
        console.log("Second operator - data received: ", value);
        return value.filter(user => user.status === "active");
    }),
    map((value) => {
        console.log("Third operator - data received: ", value);
        return (value.reduce((sum, user) => sum + user.age, 0) / value.length);
    }),
    map((value) => {
        console.log("fourth operator - data received: ", value);
        if (value < 18) throw new Error("Average age is too young");
        return value;
    })
);

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

observable
.subscribe(observer);
