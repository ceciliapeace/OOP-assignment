class Book {
    constructor(
        public title: string,
        public author: string,
        public isbn: string,
        public isAvailable: boolean = true // renamed from "available"
    ) { }
}

class LibraryMember {
    constructor(public fullName: string, public id: number) { }

    private borrowedBooks: Book[] = [];

    borrow(book: Book): void {
        if (book.isAvailable) {
            book.isAvailable = false;
            this.borrowedBooks.push(book);
            console.log(`${this.fullName} borrowed "${book.title}"`);
        } else {
            console.log(`Sorry, "${book.title}" is not available.`);
        }
    }

    return(book: Book): void {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            book.isAvailable = true;
            this.borrowedBooks.splice(index, 1);
            console.log(`${this.fullName} returned "${book.title}"`);
        } else {
            console.log(`${this.fullName} does not have "${book.title}" borrowed.`);
        }
    }
}

class Library {
    private catalog: Book[] = [];
    private registeredMembers: LibraryMember[] = [];

    addBook(newBook: Book): void {
        this.catalog.push(newBook);
    }

    registerMember(newMember: LibraryMember): void {
        this.registeredMembers.push(newMember);
    }

    showAvailableBooks(): void {
        console.log("📚 Available Books:");
        this.catalog
            .filter(book => book.isAvailable)
            .forEach(book =>
                console.log(`- "${book.title}" by ${book.author}`)
            );
    }
}

//  usage objects:
const cityLibrary = new Library();

const novel1984 = new Book("1984", "George Orwell", "123456");
const hobbitBook = new Book("The Hobbit", "J.R.R. Tolkien", "654321");

const alice = new LibraryMember("Alice Johnson", 1);

cityLibrary.addBook(novel1984);
cityLibrary.addBook(hobbitBook);
cityLibrary.registerMember(alice);

cityLibrary.showAvailableBooks();
alice.borrow(novel1984);
cityLibrary.showAvailableBooks();
alice.return(novel1984);
cityLibrary.showAvailableBooks();




//task two
class Task {
    static nextId = 1;
    taskId: number;
    isCompleted: boolean = false;

    constructor(public taskTitle: string, public taskDescription: string) {
        this.taskId = Task.nextId++;
    }

    markAsCompleted(): void {
        this.isCompleted = true;
    }
}

class TaskManager {
    private taskList: Task[] = [];

    addNewTask(taskTitle: string, taskDescription: string): void {
        const newTask = new Task(taskTitle, taskDescription);
        this.taskList.push(newTask);
        console.log(`Added task: ${newTask.taskTitle}`);
    }

    updateTaskDetails(taskId: number, newTitle?: string, newDescription?: string): void {
        const taskToUpdate = this.taskList.find(task => task.taskId === taskId);
        if (taskToUpdate) {
            if (newTitle) taskToUpdate.taskTitle = newTitle;
            if (newDescription) taskToUpdate.taskDescription = newDescription;
            console.log(`Updated task #${taskId}`);
        } else {
            console.log(`Task with ID ${taskId} not found.`);
        }
    }

    markTaskAsCompleted(taskId: number): void {
        const taskToComplete = this.taskList.find(task => task.taskId === taskId);
        if (taskToComplete) {
            taskToComplete.markAsCompleted();
            console.log(`Task #${taskId} marked as completed.`);
        } else {
            console.log(`Task with ID ${taskId} not found.`);
        }
    }

    displayAllTasks(): void {
        console.log("All Tasks:");
        this.taskList.forEach(task => {
            console.log(
                `#${task.taskId}: ${task.taskTitle} - ${task.taskDescription} [${task.isCompleted ? "Completed" : "Pending"}]`
            );
        });
    }
}

// Example usage
const taskManager = new TaskManager();
taskManager.addNewTask("Finish Assignment", "Complete the OOP project in TypeScript");
taskManager.addNewTask("Review PR", "Check code review comments");
taskManager.displayAllTasks();

taskManager.markTaskAsCompleted(1);
taskManager.updateTaskDetails(2, "Review Pull Request", "Make improvements before merging");
taskManager.displayAllTasks();
