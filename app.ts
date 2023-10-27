class BankAccount {
    private static accountCounter: number = 1;

    private accountNumber: string;
    private accountHolder: string;
    private balance: number;
    private transactions: Transaction[] = [];

    constructor(accountHolder: string, initialBalance: number) {
        this.accountNumber = this.generateAccountNumber();
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }

    private generateAccountNumber(): string {
        const paddedCounter = BankAccount.accountCounter.toString().padStart(4, '0');
        BankAccount.accountCounter++;
        return `ACC${paddedCounter}`;
    }

    deposit(amount: number): void {
        if (amount <= 0) {
            console.log("Invalid deposit amount. Amount must be greater than zero.");
        } else {
            this.balance += amount;
            this.logTransaction('deposit', amount);
            console.log(`Deposited ${amount} into account. New balance: $${this.balance}`);
        }
    }

    withdraw(amount: number): void {
        if (amount <= 0) {
            console.log("Invalid withdrawal amount. Amount must be greater than zero.");
        } else if (amount > this.balance) {
            console.log("Insufficient funds. Withdrawal not allowed.");
        } else {
            this.balance -= amount;
            this.logTransaction('withdrawal', amount);
            console.log(`Withdrawn ${amount} from account. New balance: $${this.balance}`);
        }
    }

    getBalance(): number {
        return this.balance;
    }

    private logTransaction(type: string, amount: number): void {
        const transaction: Transaction = {
            type,
            amount,
            timestamp: new Date(),
        };
        this.transactions.push(transaction);
    }
}

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
