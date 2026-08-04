/* ═══════════════════════════════════════════════════════
   Student Grading System — JavaScript
   Demonstrates: if/else, switch, for, while, do…while,
                 ternary operator, and form validation
   ═══════════════════════════════════════════════════════ */

// ──────────────────────────────────────────────────────
//  DOM References
// ──────────────────────────────────────────────────────
const form = document.getElementById("grade-form");
const studentName = document.getElementById("student-name");
const studentRoll = document.getElementById("student-roll");
const resultsSection = document.getElementById("results-section");
const resultsBody = document.getElementById("results-body");
const reportSection = document.getElementById("report-section");
const reportOutput = document.getElementById("report-output");

const SUBJECT_COUNT = 5;
const PASS_MARK = 40;

// Collect all mark inputs and their error spans
const markInputs = [];
const markErrors = [];
for (let i = 1; i <= SUBJECT_COUNT; i++) {
  markInputs.push(document.getElementById("marks-" + i));
  markErrors.push(document.getElementById("err-m" + i));
}

// Results history
let results = [];

// ══════════════════════════════════════════════════════
//  FORM VALIDATION — uses if / else
// ══════════════════════════════════════════════════════
function validateForm() {
  let isValid = true;
  const errName = document.getElementById("err-name");
  const errRoll = document.getElementById("err-roll");

  // ── if / else — validate student name ──
  if (studentName.value.trim() === "") {
    errName.textContent = "Name is required.";
    studentName.classList.add("invalid");
    isValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(studentName.value.trim())) {
    errName.textContent = "Name must contain only letters.";
    studentName.classList.add("invalid");
    isValid = false;
  } else {
    errName.textContent = "";
    studentName.classList.remove("invalid");
  }

  // ── if / else — validate roll number ──
  if (studentRoll.value.trim() === "") {
    errRoll.textContent = "Roll No. is required.";
    studentRoll.classList.add("invalid");
    isValid = false;
  } else if (isNaN(studentRoll.value.trim()) || parseInt(studentRoll.value) < 1) {
    errRoll.textContent = "Enter a valid roll number.";
    studentRoll.classList.add("invalid");
    isValid = false;
  } else {
    errRoll.textContent = "";
    studentRoll.classList.remove("invalid");
  }

  // ── for loop — validate each subject mark ──
  for (let i = 0; i < SUBJECT_COUNT; i++) {
    const value = markInputs[i].value.trim();

    if (value === "") {
      markErrors[i].textContent = "Required.";
      markInputs[i].classList.add("invalid");
      isValid = false;
    } else if (isNaN(value)) {
      markErrors[i].textContent = "Must be a number.";
      markInputs[i].classList.add("invalid");
      isValid = false;
    } else if (parseFloat(value) < 0 || parseFloat(value) > 100) {
      markErrors[i].textContent = "0 – 100 only.";
      markInputs[i].classList.add("invalid");
      isValid = false;
    } else {
      markErrors[i].textContent = "";
      markInputs[i].classList.remove("invalid");
    }
  }

  return isValid;
}

// ══════════════════════════════════════════════════════
//  GRADE DETERMINATION — uses switch
// ══════════════════════════════════════════════════════
function getGrade(percentage) {
  // ── switch — map percentage brackets to letter grades ──
  // Math.floor(percentage / 10) gives us a bracket: 10, 9, 8, 7, ...
  const bracket = Math.floor(percentage / 10);

  let grade;
  switch (bracket) {
    case 10:
      grade = "A+";
      break;
    case 9:
      grade = "A+";
      break;
    case 8:
      grade = "A";
      break;
    case 7:
      grade = "B+";
      break;
    case 6:
      grade = "B";
      break;
    case 5:
      grade = "C";
      break;
    case 4:
      grade = "D";
      break;
    default:
      grade = "F";
      break;
  }

  return grade;
}

// ══════════════════════════════════════════════════════
//  FORM SUBMISSION — brings it all together
// ══════════════════════════════════════════════════════
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // ── Step 1: Validate using if / else ──
  if (!validateForm()) {
    return;
  }


  // ── Step 2: Collect marks using for loop ──
  const marks = [];
  let total = 0;

  for (let i = 0; i < SUBJECT_COUNT; i++) {
    const mark = parseFloat(markInputs[i].value);
    marks.push(mark);
    total += mark;
  }

  const percentage = total / SUBJECT_COUNT;

  // ── Step 3: Determine grade using switch ──
  const grade = getGrade(percentage);

  // ── Step 4: Check pass / fail ──
  // Using a while loop to check if any subject is below pass mark
  let failedSubjects = 0;
  let idx = 0;

  while (idx < marks.length) {
    if (marks[idx] < PASS_MARK) {
      failedSubjects++;
    }
    idx++;
  }

  // ── Ternary operator — determine pass/fail status ──
  const status = failedSubjects === 0 ? "PASS" : "FAIL";

  // ── Count subjects above 75 using while loop ──
  let highScorers = 0;
  let j = 0;
  while (j < marks.length) {
    if (marks[j] >= 75) {
      highScorers++;
    }
    j++;
  }

  // ── Find highest and lowest marks ──
  let highest = marks[0];
  let lowest = marks[0];
  for (let i = 1; i < marks.length; i++) {
    if (marks[i] > highest) highest = marks[i];
    if (marks[i] < lowest) lowest = marks[i];
  }

  // ── Store result ──
  const result = {
    name: studentName.value.trim(),
    roll: studentRoll.value.trim(),
    marks: marks,
    total: total,
    percentage: percentage,
    grade: grade,
    status: status,
    failedSubjects: failedSubjects,
    highScorers: highScorers,
    highest: highest,
    lowest: lowest
  };

  results.push(result);


  // ── Render results table and report card ──
  renderResults();
  renderReport(result);
});

// ══════════════════════════════════════════════════════
//  RENDER RESULTS TABLE
// ══════════════════════════════════════════════════════
function renderResults() {
  resultsBody.innerHTML = "";
  resultsSection.style.display = "block";

  // ── for loop — build table rows for all results ──
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    const tr = document.createElement("tr");

    // ── Ternary — pick the CSS class for status badge ──
    const statusClass = r.status === "PASS" ? "badge--pass" : "badge--fail";

    tr.innerHTML =
      "<td>" + (i + 1) + "</td>" +
      "<td>" + r.name + "</td>" +
      "<td>" + r.roll + "</td>" +
      "<td>" + r.total + " / " + (SUBJECT_COUNT * 100) + "</td>" +
      "<td>" + r.percentage.toFixed(2) + "%</td>" +
      "<td><span class='badge badge--grade'>" + r.grade + "</span></td>" +
      "<td><span class='badge " + statusClass + "'>" + r.status + "</span></td>";

    resultsBody.appendChild(tr);
  }
}

// ══════════════════════════════════════════════════════
//  RENDER REPORT CARD — uses do…while
// ══════════════════════════════════════════════════════
function renderReport(result) {
  reportSection.style.display = "block";

  // ── Build subject rows using do…while ──
  // (At least one subject always exists, so do…while is appropriate)
  let subjectRows = "";
  let k = 0;


  do {
    // ── Ternary — mark subjects below pass mark ──
    const markClass = result.marks[k] < PASS_MARK ? "badge--fail" : "badge--pass";
    const markLabel = result.marks[k] < PASS_MARK ? "Fail" : "Pass";

    subjectRows +=
      "<tr>" +
      "<td>Subject " + (k + 1) + "</td>" +
      "<td>" + result.marks[k] + " / 100</td>" +
      "<td><span class='badge " + markClass + "'>" + markLabel + "</span></td>" +
      "</tr>";


    k++;
  } while (k < result.marks.length);

  // ── Build the full report card HTML ──
  const statusClass = result.status === "PASS" ? "badge--pass" : "badge--fail";

  reportOutput.innerHTML =
    "<div class='report-card'>" +
    "<div class='report-header'>" +
    "<h3>" + result.name + "</h3>" +
    "<p>Roll No. " + result.roll + "</p>" +
    "</div>" +
    "<div class='report-body'>" +
    "<table>" +
    "<thead><tr><th>Subject</th><th>Marks</th><th>Status</th></tr></thead>" +
    "<tbody>" + subjectRows + "</tbody>" +
    "</table>" +
    "</div>" +
    "<div class='report-footer'>" +
    "<span class='stat'>Total: <strong>" + result.total + " / " + (SUBJECT_COUNT * 100) + "</strong></span>" +
    "<span class='stat'>Percentage: <strong>" + result.percentage.toFixed(2) + "%</strong></span>" +
    "<span class='stat'>Grade: <span class='badge badge--grade'>" + result.grade + "</span></span>" +
    "<span class='stat'><span class='badge " + statusClass + "'>" + result.status + "</span></span>" +
    "</div>" +
    "</div>";

  reportSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ══════════════════════════════════════════════════════
//  RESET — clear errors on form reset
// ══════════════════════════════════════════════════════
form.addEventListener("reset", function () {
  // Clear all error messages and invalid styles
  document.getElementById("err-name").textContent = "";
  document.getElementById("err-roll").textContent = "";
  studentName.classList.remove("invalid");
  studentRoll.classList.remove("invalid");

  for (let i = 0; i < SUBJECT_COUNT; i++) {
    markErrors[i].textContent = "";
    markInputs[i].classList.remove("invalid");
  }

});