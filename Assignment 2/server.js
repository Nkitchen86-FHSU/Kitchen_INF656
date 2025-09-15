import { listTasks, addTask, completeTask } from "./controllers/taskManager.js";
import readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

// Create the readline interface
const rl = readline.createInterface({ input, output });

// Create function to handle question responses
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

const mainMenu = async() => {
    let keepGoing = true;
    while (keepGoing) {
        const choice = await askQuestion('\nWelcome to the task manager!\n1. List all tasks.\n2. Add a new task.\n3. Mark a task as completed.\nPlease choose one of the above options (1, 2, or 3): ');
        if (choice === '1') {
            // List all tasks
            await listTasks();
        } else if (choice === '2') {
            // Add a new task
            const title = await askQuestion('Title: ');
            const description = await askQuestion('Description: ');
            const taskObject = {title: title, description: description, status: "Not complete"};
            await addTask(taskObject);
        } else if (choice === '3') {
            // Mark a task as complete
            await listTasks();
            const taskNumber = await askQuestion('Which task do you want to mark as completed?\n');
            await completeTask(taskNumber);
        } else {
            // Invalid selection
            console.log('Invalid input, try again...\n');
            continue;
        }

        const again = await askQuestion('Would you like another selection? (Y/N): ');
        if(again.toLowerCase() !== 'y') {
            keepGoing = false;
        }
    }
    rl.close();
}

mainMenu();