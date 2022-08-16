const pageSwitcher = document.querySelectorAll('.page_title');
const topPage = document.querySelector('.top_page');

const form = document.querySelector('.form_container');
const myBalance = document.querySelector('.myBalance');
const saving = document.querySelector('.mySavings');
const expense = document.querySelector('.myExpense');
const typeInput = document.querySelector('.type');
const amountInput = document.querySelector('.amount');
const discountInput = document.querySelector('.discount');
const noteInput = document.querySelector('.note');

const screenTop = document.querySelector('.top');
const screenBottom = document.querySelector('.bottom');
const numbers = document.querySelectorAll('.numbers');
const operands = document.querySelectorAll('.operand');
const clear = document.querySelector('.clear');
const reset = document.querySelector('.reset');
const equal = document.querySelector('.equal');


pageSwitcher.forEach(element => {
    element.addEventListener('click', pageSwitch);
});

function pageSwitch(e) {
    const page = e.target.innerHTML;

    if(page === "Expense"){
        topPage.classList.remove("show_top");
    };

    if(page === "Calculator"){
        topPage.classList.toggle("show_top");
    };
};

form.addEventListener('submit', SubmitForm);
window.addEventListener('DOMContentLoaded', setPage);

function SubmitForm(e){
    e.preventDefault();

    const newTransaction = {
        type : typeInput.value,
        amount : amountInput.value,
        discount : discountInput.value,
        note : noteInput.value
    };

    setBalance();
    getSaving(newTransaction);
    form.reset();
};

// add current money you have //
// add expense and income to the page //
// calculate how much save or spend and put them on the page //
// separate the expense and income by category/type

let balance = 0;
let savings = 0;
let expenses = 0;

const setBalance = () => {
    if(typeInput.value === 'income'){
        balance = parseInt(amountInput.value);

        const newBalance = parseInt(amountInput.value)

        updateLocalStorage(budget={
            saving : savings,
            expense : expenses,
            balance : balance,
            note : ''
        }, newBalance);
        
        updateBalance();
    }
};

const getSaving = (entry) => {
    if(entry.type === 'expense'){
        expenses = parseInt(entry.amount) * ((100 - entry.discount) / 100);
        savings = parseInt(entry.amount) - expenses;
        balance -= expenses;

        const budget = {
            saving : savings,
            expense : expenses,
            balance : balance,
            note : entry.note
        };

        addToLocalStorage(budget);
        addToLocalStorage2(budget); //
        updateBalance();
    }
};

function addToLocalStorage(amount){
    let items = localStorage.getItem('budget')? JSON.parse(localStorage.getItem('budget')) : [];
    items.length === 0 ? items.push(amount) : items[0] = amount;

    localStorage.setItem('budget', JSON.stringify(items));
};

function addToLocalStorage2(entry){

};

function updateLocalStorage(amount, newBalance){
    let items = localStorage.getItem('budget')? JSON.parse(localStorage.getItem('budget')) : [];

    items.length === 0 ? items.push(amount) : items[0] = {
            ...items[0],
            balance : newBalance + items[0].balance
    };
    
    localStorage.setItem('budget', JSON.stringify(items));
    setPage();
};

const updateBalance = () => {
    myBalance.innerHTML = `$ ${balance}`;
    saving.innerHTML = `$ ${savings}`;
    expense.innerHTML = `$ ${expenses}`;
};

updateBalance();

function setPage(){
    let items = localStorage.getItem('budget')? JSON.parse(localStorage.getItem('budget')) : [];

    balance = items[0].balance;
    savings = items[0].saving;
    expenses = items[0].expense;

    myBalance.innerHTML = `$ ${items[0].balance}`;
    saving.innerHTML = `$ ${items[0].saving}`;
    expense.innerHTML = `$ ${items[0].expense}`;
}


// calculator
let num;
let operand;

numbers.forEach(number => number.addEventListener('click', getNumbers));
operands.forEach(operand => operand.addEventListener('click', getOperand));
equal.addEventListener('click', solveOperation);

function getNumbers(e){
    const entry = e.target.innerHTML;

    screenBottom.innerHTML += entry;
    
    num = screenBottom.innerHTML;

};

function getOperand(e){

};

function solveOperation(){
    console.log(num);
};