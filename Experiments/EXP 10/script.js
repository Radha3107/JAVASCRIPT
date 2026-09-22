function displayData(data) {

    const tableBody =
        document.getElementById("dataTable");

    const recordCount =
        document.getElementById("recordCount");

    tableBody.innerHTML = "";

    recordCount.textContent =
        data.length + " Records";


    data.forEach(student => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>#${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.marks}%</td>
        `;

        tableBody.appendChild(row);
    });
}


// ==========================================
// FETCH()
// ==========================================

function loadUsingFetch() {

    const status =
        document.getElementById("status");

    status.innerHTML =
        '<span class="status-dot"></span> Loading with fetch()...';


    fetch("data.json")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to load JSON data"
                );
            }

            return response.json();
        })

        .then(data => {

            displayData(data);

            status.innerHTML =
                '<span class="status-dot"></span> ✓ Data loaded successfully using fetch()';

        })

        .catch(error => {

            status.innerHTML =
                '<span class="status-dot"></span> ❌ ' +
                error.message;
        });
}


// ==========================================
// jQuery $.getJSON()
// ==========================================

function loadUsingJSON() {

    const status =
        document.getElementById("status");

    status.innerHTML =
        '<span class="status-dot"></span> Loading with $.getJSON()...';


    $.getJSON("data.json")

        .done(function(data) {

            displayData(data);

            status.innerHTML =
                '<span class="status-dot"></span> ✓ Data loaded successfully using $.getJSON()';

        })

        .fail(function() {

            status.innerHTML =
                '<span class="status-dot"></span> ❌ Unable to load JSON data.';
        });
}