// Define the BankAccount class
class BankAccount {
    // Create a static account counter and initialize it to 1
    private static accountCounter: number = 1;

    // Define private fields for account information
    private accountNumber: string;
    private accountHolder: string;
    private balance: number;
    private transactions: Transaction[] = [];

    // Constructor to initialize the account with an account holder and initial balance
    constructor(accountHolder: string, initialBalance: number) {
        // Generate a unique account number
        this.accountNumber = this.generateAccountNumber();
        // Set the account holder's name
        this.accountHolder = accountHolder;
        // Set the initial balance
        this.balance = initialBalance;
    }

    // Private method to generate a unique account number
    private generateAccountNumber(): string {
        // Generate a padded account number based on the static account counter
        const paddedCounter = BankAccount.accountCounter.toString().padStart(4, '0');
        // Increment the account counter for the next account
        BankAccount.accountCounter++;
        // Combine the account number prefix and the padded counter
        return `ACC${paddedCounter}`;
    }

    // Method to deposit funds into the account
    deposit(amount: number): void {
        // Check if the deposit amount is valid (greater than zero)
        if (amount <= 0) {
            console.log("Invalid deposit amount. Amount must be greater than zero.");
        } else {
            // Update the account balance
            this.balance += amount;
            // Log the deposit transaction
            this.logTransaction('deposit', amount);
            // Display a message with the new balance
            console.log(`Deposited ${amount} into account. New balance: $${this.balance}`);
        }
    }

    // Method to withdraw funds from the account
    withdraw(amount: number): void {
        // Check if the withdrawal amount is valid (greater than zero)
        if (amount <= 0) {
            console.log("Invalid withdrawal amount. Amount must be greater than zero.");
        } else if (amount > this.balance) {
            // Check for insufficient funds
            console.log("Insufficient funds. Withdrawal not allowed.");
        } else {
            // Update the account balance
            this.balance -= amount;
            // Log the withdrawal transaction
            this.logTransaction('withdrawal', amount);
            // Display a message with the new balance
            console.log(`Withdrawn ${amount} from account. New balance: $${this.balance}`);
        }
    }

    // Method to get the current balance of the account
    getBalance(): number {
        return this.balance;
    }

    // Private method to log a transaction with type, amount, and timestamp
    private logTransaction(type: string, amount: number): void {
        const transaction: Transaction = {
            type,
            amount,
            timestamp: new Date(),
        };
        this.transactions.push(transaction);
    }
}

// Define the Transaction interface
interface Transaction {
    type: string;
    amount: number;
    timestamp: Date;
}

// Example usage:
const customerAccount = new BankAccount("John Doe", 1000);
console.log(`Account Number: ${customerAccount['accountNumber']}`);
console.log(`Account Holder: ${customerAccount['accountHolder']}`);
console.log(`Initial Balance: $${customerAccount['balance']}`);

customerAccount.deposit(500);
customerAccount.withdraw(200);
customerAccount.withdraw(1500);
console.log(`Current Balance: $${customerAccount.getBalance()}`);
