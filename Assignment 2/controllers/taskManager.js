import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tasksFile = path.join(__dirname, '../data/tasks.json');

export const getAllTasks = async () => {
    let filehandle;
    try {
        filehandle = await readFile(tasksFile, 'utf-8');
    } catch(err) {
        console.log(`Couldn't read file! Error: ${err}\n`);
        return [];
    }

    return JSON.parse(filehandle);
}

export const listTasks = async () => {
    let taskArray = [];
    try {
        taskArray = await getAllTasks();
    } catch (err) {
        console.log(`Failed fetching tasks! Error: ${err}\n`);
        return [];
    }

    for (let i = 0; i < taskArray.length; i++) {
        console.log(`${i+1}. Title: ${taskArray[i].title}, Description: ${taskArray[i].description}, Status: ${taskArray[i].status}`);
    }
}

export const addTask = async (taskObject) => {
    let taskArray = [];
    try {
        taskArray = await getAllTasks();
    } catch (err) {
        console.log(`Failed fetching tasks! Error: ${err}\n`);
        return [];
    }

    taskArray.push(taskObject);

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
    try {
        taskArray = await getAllTasks();
    } catch (err) {
        console.log(`Failed fetching tasks! Error: ${err}\n`);
        return [];
    }

    if (taskIndex < 1 || taskIndex > taskArray.length)
        return console.log('Invalid index input.\n');

    if (taskArray[taskIndex-1].status === "Complete"){
        return console.log('Task is already complete.\n');
    } else {
        taskArray[taskIndex-1].status = "Complete";
        try {
            await writeFile(tasksFile, JSON.stringify(taskArray, null, 2));
            return console.log('Task successfully added!\n');
        } catch (err) {
            console.log(`Failed to add task to file! Error: ${err}\n`);
            return [];
        }
        return console.log('The task is now complete.\n');
    }
}