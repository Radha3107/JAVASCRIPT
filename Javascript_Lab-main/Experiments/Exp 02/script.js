/* ═══════════════════════════════════════════════════════
   Billing Calculator — JavaScript
   Demonstrates: var, let, const, template literals,
                 destructuring, and user input via prompt()
   ═══════════════════════════════════════════════════════ */

// ──────────────────────────────────────────────────────
// 1. `var` — function-scoped, hoisted, re-declarable
//    Used here for the tax rate (legacy-style declaration)
// ──────────────────────────────────────────────────────
var taxRate = 18; // default GST percentage

// ──────────────────────────────────────────────────────
// 2. `let` — block-scoped, reassignable
//    Used for the items array and the running subtotal
// ──────────────────────────────────────────────────────
let items = [];     // line-item collection (will grow)
let subtotal = 0;   // recalculated on every change

// ──────────────────────────────────────────────────────
// 3. `const` — block-scoped, immutable binding
//    Used for DOM references and utility functions
// ──────────────────────────────────────────────────────
const btnAdd         = document.getElementById("btn-add");
const btnCalculate   = document.getElementById("btn-calculate");
const tableBody      = document.getElementById("items-body");
const itemsTable     = document.getElementById("items-table");
const emptyMsg       = document.getElementById("empty-msg");
const invoiceSection = document.getElementById("invoice-section");
const invoiceOutput  = document.getElementById("invoice-output");
const codeBlock      = document.getElementById("code-block");
const consoleLog     = document.getElementById("console-log");

// ── Helper: format currency ──
const formatCurrency = (amount) => `Rs.${amount.toFixed(2)}`;

// ══════════════════════════════════════════════════════
//  CUSTOM CONSOLE — mirrors logs into the on-page panel
// ══════════════════════════════════════════════════════
let firstLog = true;

function logToConsole(message, type) {
  if (firstLog) {
    consoleLog.innerHTML = "";
    firstLog = false;
  }
  const p = document.createElement("p");
  p.className = "log log--" + type;
  p.textContent = message;
  consoleLog.appendChild(p);
  consoleLog.scrollTop = consoleLog.scrollHeight;
}

// ══════════════════════════════════════════════════════
//  ADD ITEM — uses prompt() for input
// ══════════════════════════════════════════════════════
btnAdd.addEventListener("click", function () {

  // ── prompt() — ask user for item details one by one ──
  const name = prompt("Enter item name:");
  if (name === null || name.trim() === "") {
    alert("Item name cannot be empty!");
    return;
  }

  const qtyStr = prompt("Enter quantity for \"" + name.trim() + "\":");
  if (qtyStr === null) return;
  const qty = parseInt(qtyStr, 10);
  if (isNaN(qty) || qty < 1) {
    alert("Quantity must be a number >= 1!");
    return;
  }

  const priceStr = prompt("Enter price per unit for \"" + name.trim() + "\":");
  if (priceStr === null) return;
  const price = parseFloat(priceStr);
  if (isNaN(price) || price < 0) {
    alert("Price must be a valid number!");
    return;
  }

  // ── `const` for each item object (binding is immutable) ──
  const lineTotal = qty * price;
  const item = { name: name.trim(), qty, price, lineTotal };

  // ── `let` — reassign the items array & subtotal ──
  items.push(item);
  subtotal += lineTotal;

  // ── `var` — demonstrate function-scope hoisting ──
  var currentTax = taxRate; // var is function-scoped to this handler
  logToConsole("[var]  currentTax hoisted in handler scope = " + currentTax + "%", "var");

  // ── `let` log ──
  logToConsole(`[let]  subtotal reassigned = ${formatCurrency(subtotal)}`, "let");

  // ── `const` log ──
  logToConsole(`[const] item = { name: "${item.name}", qty: ${item.qty}, price: ${item.price}, lineTotal: ${item.lineTotal} }`, "const");

  // ── Template Literal — build a readable log message ──
  const logMsg = `Added "${item.name}" x ${qty} @ ${formatCurrency(price)} = ${formatCurrency(lineTotal)}`;
  logToConsole("[`${}] " + logMsg, "template");

  // ── Destructuring — unpack the item ──
  const { name: itemName, qty: itemQty } = item;
  logToConsole("[ {} ] Destructured -> itemName=\"" + itemName + "\", itemQty=" + itemQty, "destruct");

  // Render table
  renderTable();

  // Confirm to user
  alert(`Added: ${item.name} x ${qty} @ ${formatCurrency(price)} = ${formatCurrency(lineTotal)}`);
});

// ══════════════════════════════════════════════════════
//  RENDER TABLE
// ══════════════════════════════════════════════════════
function renderTable() {
  tableBody.innerHTML = "";

  if (items.length === 0) {
    itemsTable.classList.remove("has-items");
    emptyMsg.classList.remove("hidden");
    return;
  }

  itemsTable.classList.add("has-items");
  emptyMsg.classList.add("hidden");

  items.forEach(function (item, index) {
    // ── Destructuring each item inside the loop ──
    const { name, qty, price, lineTotal } = item;

    const tr = document.createElement("tr");

    // ── Template Literal — build the row HTML ──
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${name}</td>
      <td>${qty}</td>
      <td>${formatCurrency(price)}</td>
      <td>${formatCurrency(lineTotal)}</td>
      <td><button class="btn btn--delete" data-index="${index}">x</button></td>
    `;

    tableBody.appendChild(tr);
  });

  // Delete buttons
  tableBody.querySelectorAll(".btn--delete").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const idx = parseInt(this.dataset.index, 10);
      const removed = items[idx];
      logToConsole("Removed \"" + removed.name + "\" (" + formatCurrency(removed.lineTotal) + ")", "info");
      items.splice(idx, 1);

      // ── `let` — recalculate subtotal ──
      subtotal = 0;
      items.forEach(function (it) {
        subtotal += it.lineTotal;
      });

      renderTable();
    });
  });
}

// ══════════════════════════════════════════════════════
//  CALCULATE — uses prompt() for tax & discount
// ══════════════════════════════════════════════════════
btnCalculate.addEventListener("click", function () {
  if (items.length === 0) {
    alert("Add at least one item before calculating!");
    return;
  }

  // ── `var` — ask tax rate via prompt ──
  var taxRateStr = prompt("Enter tax rate % (default 18):", "18");
  if (taxRateStr === null) return;
  var taxRate = parseFloat(taxRateStr) || 0;
  logToConsole("[var]  taxRate re-declared in this scope = " + taxRate + "%", "var");

  // ── `const` — ask discount via prompt ──
  const discountStr = prompt("Enter discount % (default 0):", "0");
  if (discountStr === null) return;
  const discountPercent = parseFloat(discountStr) || 0;
  logToConsole("[const] discountPercent = " + discountPercent + "%", "const");

  // ── `let` — recalculate the subtotal ──
  let calcSubtotal = 0;
  for (let i = 0; i < items.length; i++) {
    calcSubtotal += items[i].lineTotal;
  }
  logToConsole(`[let]  calcSubtotal = ${formatCurrency(calcSubtotal)}`, "let");

  // ── Compute billing values ──
  const discountAmount = calcSubtotal * (discountPercent / 100);
  const afterDiscount  = calcSubtotal - discountAmount;
  const taxAmount      = afterDiscount * (taxRate / 100);
  const grandTotal     = afterDiscount + taxAmount;

  // ── Bundle into an object for destructuring demo ──
  const billingResult = {
    subtotal:    calcSubtotal,
    discount:    discountAmount,
    discountPct: discountPercent,
    taxable:     afterDiscount,
    tax:         taxAmount,
    taxPct:      taxRate,
    total:       grandTotal,
    itemCount:   items.length
  };

  // ──────────────────────────────────────────────────
  // 5. Destructuring — unpack the result object
  // ──────────────────────────────────────────────────
  const {
    subtotal: billSubtotal,
    discount: billDiscount,
    discountPct,
    taxable,
    tax,
    taxPct,
    total,
    itemCount
  } = billingResult;

  logToConsole("[ {} ] Destructured billingResult -> total = " + formatCurrency(total), "destruct");

  // ──────────────────────────────────────────────────
  // 4. Template Literal — build invoice HTML
  // ──────────────────────────────────────────────────
  let invoiceHTML = "";

  items.forEach(function (item, idx) {
    const { name, qty, price, lineTotal } = item;
    invoiceHTML += `
      <div class="inv-row">
        <span class="inv-label">${idx + 1}. ${name} (x${qty} @ ${formatCurrency(price)})</span>
        <span>${formatCurrency(lineTotal)}</span>
      </div>
    `;
  });

  invoiceHTML += `
    <div class="inv-row">
      <span class="inv-label">Subtotal (${itemCount} items)</span>
      <span>${formatCurrency(billSubtotal)}</span>
    </div>
    <div class="inv-row">
      <span class="inv-label">Discount (${discountPct}%)</span>
      <span>- ${formatCurrency(billDiscount)}</span>
    </div>
    <div class="inv-row">
      <span class="inv-label">Taxable Amount</span>
      <span>${formatCurrency(taxable)}</span>
    </div>
    <div class="inv-row">
      <span class="inv-label">Tax @ ${taxPct}%</span>
      <span>+ ${formatCurrency(tax)}</span>
    </div>
    <div class="inv-row inv-row--total">
      <span class="inv-label">Grand Total</span>
      <span>${formatCurrency(total)}</span>
    </div>
  `;

  logToConsole("[`${}] Invoice HTML built with template literals", "template");
  logToConsole(">> Grand Total = " + formatCurrency(total), "result");

  // Render invoice
  invoiceOutput.innerHTML = invoiceHTML;
  invoiceSection.style.display = "block";
  invoiceSection.scrollIntoView({ behavior: "smooth", block: "start" });

  // Show grand total in alert
  alert("Grand Total: " + formatCurrency(total));

  // ── Code explanation block ──
  codeBlock.textContent = `// -- var: function-scoped, hoisted --
var taxRate = ${taxRate};
// taxRate is accessible anywhere in the function

// -- let: block-scoped, reassignable --
let subtotal = 0;
for (let i = 0; i < items.length; i++) {
  subtotal += items[i].lineTotal;   // reassigned each iteration
}
// subtotal = ${formatCurrency(calcSubtotal)}

// -- const: block-scoped, immutable binding --
const discountPercent = ${discountPercent};
const grandTotal = ${grandTotal.toFixed(2)};
// grandTotal cannot be reassigned

// -- Template Literal --
const message = \`Your total is \${formatCurrency(${grandTotal.toFixed(2)})}\`;
// Output: "Your total is ${formatCurrency(grandTotal)}"

// -- Destructuring --
const { subtotal, discount, tax, total } = billingResult;
// Unpacks object properties into individual variables
// subtotal = ${formatCurrency(billSubtotal)}
// discount = ${formatCurrency(billDiscount)}
// tax      = ${formatCurrency(tax)}
// total    = ${formatCurrency(total)}`;
});

// ══════════════════════════════════════════════════════
//  INIT LOG
// ══════════════════════════════════════════════════════
logToConsole("Billing Calculator initialized.", "info");
logToConsole("[var]  taxRate declared with var = 18%", "var");
logToConsole("[let]  items = [], subtotal = 0", "let");
logToConsole("[const] DOM references bound with const", "const");
