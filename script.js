// JavaScript for handling form submissions, dynamic updates, and chart functionality

let income = 0;
let totalSpend = 0;
const expenseData = {}; // To store expense data for chart

const incomeForm = document.getElementById('income-form');
const expenseForm = document.getElementById('expense-form');
const incomeAmountField = document.getElementById('income-amount');
const totalAmountSpan = document.getElementById('total-amount');
const remainingAmountSpan = document.getElementById('remaining-amount');
const expenseTableBody = document.getElementById('expense-table-body');
const ctx = document.getElementById('expenseChart').getContext('2d');

let expenseChart = null;

// Initialize chart
function initializeChart() {
    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Expenses by Category',
                    data: [],
                    backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
            },
        },
    });
}

// Update chart data
function updateChart() {
    expenseChart.data.labels = Object.keys(expenseData);
    expenseChart.data.datasets[0].data = Object.values(expenseData);
    expenseChart.update();
}

// Handle income form submission
incomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const incomeAmount = parseFloat(incomeAmountField.value);
    if (!isNaN(incomeAmount) && incomeAmount > 0) {
        income += incomeAmount;
        updateSummary();
        incomeAmountField.value = '';
    }
});

// Handle expense form submission
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const expenseName = document.getElementById('expense-name').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
    const expenseDate = document.getElementById('expense-date').value;
    const expenseCategory = document.getElementById('expense-category').value;

    if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0 && expenseDate && expenseCategory) {
        totalSpend += expenseAmount;

        // Update expense data for chart
        if (!expenseData[expenseCategory]) {
            expenseData[expenseCategory] = 0;
        }
        expenseData[expenseCategory] += expenseAmount;

        addExpenseToTable(expenseDate, expenseName, expenseCategory, expenseAmount);
        updateSummary();
        updateChart();

        // Clear input fields
        expenseForm.reset();
    }
});

// Add expense data to the table
function addExpenseToTable(date, name, category, amount) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${date}</td>
        <td>${name}</td>
        <td>${category}</td>
        <td>$${amount.toFixed(2)}</td>
    `;
    expenseTableBody.appendChild(row);
}

// Update the summary (total spend and remaining income)
function updateSummary() {
    totalAmountSpan.textContent = totalSpend.toFixed(2);
    const remainingIncome = income - totalSpend;
    remainingAmountSpan.textContent = remainingIncome.toFixed(2);
}

// Initialize the chart on page load
initializeChart();
