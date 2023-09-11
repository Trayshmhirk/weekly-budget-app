// classes

class Budget {
   constructor (budget) {
      this.budget = Number(budget);
      this.budgetLeft = this.budget;
   }

   // substract from the budget
   substractFromBudget(amount) {
      return this.budgetLeft -= amount;
   }
}

// HTML class
class HTML {
   constructor() {

   }

   // inserts budget into the html class
   insertBudget(amount) {
      totalBudget.innerHTML = `${amount}`;
      budgetLeft.innerHTML = `${amount}`;

   }

   // displays error message in the html
   printMessage(message, className) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('text-center', 'alert', className);
      messageDiv.appendChild(document.createTextNode(message));
      // messageDiv.textContent = message;

      // insert messageDiv into the html
      const primaryDiv = document.querySelector('.primary');
      primaryDiv.insertBefore(messageDiv, form);

      // remove error message after 3s
      setTimeout(() => {
         document.querySelector('.primary .alert').remove();
         form.reset();
      }, 2000);
   }

   // displays expenses from the form into the list
   addExpenseToList(expense, amount) {
      const expenseList = document.querySelector('#expenses ul');

      // create li
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      // create template
      li.innerHTML = `
         ${expense} <span class="badge text-bg-primary rounded-pill">$${amount}</span>
      `
      // insert into the html
      expenseList.appendChild(li);
   }

   // track the budget and return the amount left after substractinh
   trackBudget(amount) {
      // const currentBudgetLeft = budget.budgetLeft -= amount;
      const currentBudgetLeft = budget.substractFromBudget(amount);
      /*
         this is another method of running the function 
         because we already have the budget instantiation in the global scope
      */

      // insert the budget left into the span left
      budgetLeft.innerText = currentBudgetLeft;

      // track percentage of budget to change the color of the div
      if ((budget.budget / 4) > currentBudgetLeft) {
         // add/remove classes to change colors
         budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
         budgetLeft.parentElement.parentElement.classList.add('alert-danger');

      } else if ((budget.budget / 2) > currentBudgetLeft) {
         budgetLeft.parentElement.parentElement.classList.remove('alert-success');
         budgetLeft.parentElement.parentElement.classList.add('alert-warning');
      }
   }
}


// variables
const form = document.getElementById('add-expense'),
   totalBudget = document.getElementById('total'),
   budgetLeft =  document.getElementById('left');

let budget, userBudget;

// instantiate HTML class
const html = new HTML();


// event listeners
eventListeners();
function eventListeners() {
   // app init
   document.addEventListener('DOMContentLoaded', function () {
      // asks the visitor to add a weekly budget
      userBudget = prompt("What's your budget for this week?");
      
      // validate the userBudget
      if (userBudget === null || userBudget === '' || userBudget === '0') {
         window.location.reload();
      } else {
         // budget is valid.. instantiate budget class
         budget = new Budget(userBudget);
         
         // create HTML methods for passing budget into html
         html.insertBudget(budget.budget);
      }
   })

   // when new expense is added
   form.addEventListener('submit', function (e) {
      e.preventDefault();

      // read the values from the budget form
      const expenseName = document.getElementById('expense').value;
      const expenseAmount = document.getElementById('amount').value;

      // validate the input fields: if empty, print error; if not, run the calculation function
      if (expenseName === '' || expenseAmount === '') {
         // print error message into the html
         html.printMessage('Error occurred.. all fields are mandatory.', 'alert-danger');

      } else {
         // add the expenses into the list
         html.addExpenseToList(expenseName, expenseAmount);
         // track the budget and substract amount
         html.trackBudget(expenseAmount);
         // print success message after submitting
         html.printMessage('Added...', 'alert-success');
      }
   })
}