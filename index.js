#! /usr/bin/env node
import inquirer from "inquirer";
import showBanner from "node-banner";
import chalk from "chalk";
//Make a function to generate a random number.
//Here math.random generates a random number with floating type. 
//math.floor makes the number a whole number.
//*100 makes sure that number is between 1 and 100.
//+1 further makes the range of 1 anf 100
function generateNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
//Banner:
//asking user for its name:
let user = [
    {
        name: "Name",
        type: "string",
        message: "Enter your name"
    },
    {
        name: "Gender",
        type: "list",
        choices: ["Male", "female"],
        message: "Select your gender"
    }
];
//function to start the game
async function greet() {
    let banner = showBanner('Guessing-Game', 'Its time to play', 'green', 'yellow');
    await banner;
    let { Name, Gender } = await inquirer.prompt(user);
    let greet_text = "welcome to the number guessing game!";
    console.log(`${greet_text.toUpperCase()}`);
    // object to take input from the user
    let targetNumber = generateNumber();
    let attempts = 5;
    while (attempts > 0) {
        let guesses = [
            {
                name: "Guess",
                type: "number",
                message: `Guess a number (Attempts left: ${chalk.red(attempts)})`,
            }
        ];
        let { Guess } = await inquirer.prompt(guesses);
        // console.log(Guess);
        if (Guess == targetNumber) {
            console.log(chalk.blue(`Congratulation! you won`));
            break;
        }
        else {
            if (Guess > targetNumber) {
                console.log("Your number is greater than the actual number. Try again!");
            }
            else if (Guess < targetNumber) {
                console.log("Your number is smaller than the actual number. Try again!");
            }
            attempts--;
        }
        if (attempts === 0) {
            console.log(`Sorry! you are out of attempts. The correct number was: ${targetNumber}`);
        }
    }
}
greet();
