function showSecondDOB() {
    document.getElementById('second-dob').style.display = 'block';
}

function calculateAge() {
    let firstDay = document.getElementById('first-day').value;
    let firstMonth = document.getElementById('first-month').value;
    let firstYear = document.getElementById('first-year').value;

    let secondDay = document.getElementById('second-day').value;
    let secondMonth = document.getElementById('second-month').value;
    let secondYear = document.getElementById('second-year').value;

    let errorMessage = ""; 

    if (!firstDay || !firstMonth || !firstYear) {
        errorMessage = "Please enter a valid date for the first person!";
    }

    let firstDate = new Date(firstYear, firstMonth - 1, firstDay);

    if (!errorMessage && (firstDate.getFullYear() != firstYear || firstDate.getMonth() + 1 != firstMonth || firstDate.getDate() != firstDay)) {
        errorMessage = "Invalid date entered for the first person!";
    }

    let today = new Date();

    if (!errorMessage && (!secondDay && !secondMonth && !secondYear)) {
        let diffYears = today.getFullYear() - firstDate.getFullYear();
        let diffMonths = today.getMonth() - firstDate.getMonth();
        let diffDays = today.getDate() - firstDate.getDate();

        if (diffDays < 0) {
            diffMonths--;
            diffDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (diffMonths < 0) {
            diffYears--;
            diffMonths += 12;
        }

        let resultText = `First person is ${diffYears} years, ${diffMonths} months, and ${diffDays} days old.`;
        
        document.getElementById('main-container').innerHTML = `
            <h1 class="result-heading">Result</h1>
            <p class="result-text">${resultText}</p>
            <button class="reset-btn" onclick='resetFields()'>Reset</button>
        `;
        return;
    }

    if (!errorMessage && (!secondDay || !secondMonth || !secondYear)) {
        errorMessage = "Please enter a valid date for the second person!";
    }

    let secondDate = new Date(secondYear, secondMonth - 1, secondDay);

    if (!errorMessage && (secondDate.getFullYear() != secondYear || secondDate.getMonth() + 1 != secondMonth || secondDate.getDate() != secondDay)) {
        errorMessage = "Invalid date entered for the second person!";
    }

    if (errorMessage) {
        document.getElementById('main-container').innerHTML = `
            <h1 class="error-heading">Error❌</h1>
            <p class="error-text">${errorMessage}</p>
            <button class="reset-btn" onclick='resetFields()'>Go Back</button>
        `;
        return;
    }

    let older = firstDate < secondDate ? firstDate : secondDate;
    let younger = firstDate > secondDate ? firstDate : secondDate;
    let olderPerson = firstDate < secondDate ? "First person" : "Second person";
    let youngerPerson = firstDate > secondDate ? "First person" : "Second person";

    let diffYears = younger.getFullYear() - older.getFullYear();
    let diffMonths = younger.getMonth() - older.getMonth();
    let diffDays = younger.getDate() - older.getDate();

    if (diffDays < 0) {
        diffMonths--;
        diffDays += new Date(older.getFullYear(), older.getMonth() + 1, 0).getDate();
    }
    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
    }

    let ageDifference = `${olderPerson} is older than ${youngerPerson} by ${diffYears} years, ${diffMonths} months, and ${diffDays} days.`;
    if (firstDate.getTime() === secondDate.getTime()) {
        ageDifference = "Both are of the same age.";
    }
    
    document.getElementById('main-container').innerHTML = `
        <h1 class="result-heading">Result</h1>
        <p class="result-text">${ageDifference}</p>
        <button class="reset-btn" onclick='resetFields()'>Reset</button>
    `;
}

function resetFields() {
    location.reload();
}