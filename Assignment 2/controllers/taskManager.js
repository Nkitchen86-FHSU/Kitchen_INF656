import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tasksFile = path.join(__dirname, '../data/tasks.json');

// Get all tasks in JSON file
export const getAllTasks = async () => {
    let filehandle;
    // Read in task JSON file
    try {
        filehandle = await readFile(tasksFile, 'utf-8');
    } catch(err) {
        console.log(`Couldn't read file! Error: ${err}\n`);
        return [];
    }

    return JSON.parse(filehandle);
}

// List all tasks in the JSON file
export const listTasks = async () => {
    let taskArray = [];
    // Get all the tasks
    try {
        taskArray = await getAllTasks();
    } catch (err) {
        console.log(`Failed fetching tasks! Error: ${err}\n`);
        return [];
    }

    // Format output to console
    for (let i = 0; i < taskArray.length; i++) {
        console.log(`${i+1}. Title: ${taskArray[i].title}, Description: ${taskArray[i].description}, Status: ${taskArray[i].status}`);
    }
}

// Add a task to the JSON file
export const addTask = async (taskObject) => {
    let taskArray = [];
    // Get all the tasks
    try {
        taskArray = await getAllTasks();
    } catch (err) {
        console.log(`Failed fetching tasks! Error: ${err}\n`);
        return [];
    }

    // Push new object onto array
    taskArray.push(taskObject);

    // Write updated array to JSON file
    try {
        await writeFile(tasksFile, JSON.stringify(taskArray, null, 2));
        return console.log('Task successfully added!\n');
    } catch (err) {
        console.log(`Failed to add task to file! Error: ${err}\n`);
        return [];
    }
}

export const completeTask = async (taskIndex) => {
    let taskArray = [];
    // Get all the tasks
    try {
        taskArray = await getAllTasks();
    } catch (err) {
        console.log(`Failed fetching tasks! Error: ${err}\n`);
        return [];
    }

    // Validate input
    if (taskIndex < 1 || taskIndex > taskArray.length)
        return console.log('Invalid index input.\n');

    // Check if tasks is already complete
    if (taskArray[taskIndex-1].status === "Complete"){
        return console.log('Task is already complete.\n');
    } else {
        // Mark task as complete
        taskArray[taskIndex-1].status = "Complete";
        try {
            await writeFile(tasksFile, JSON.stringify(taskArray, null, 2));
            return console.log('Task successfully completed!\n');
        } catch (err) {
            console.log(`Failed to add task to file! Error: ${err}\n`);
            return [];
        }
    }
}