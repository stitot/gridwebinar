Grid.AST.allowedTags.push("input");
Grid.AST.allowedAttributes.push("value");

const org_employeeData = {
  id: ["a1B2c3D4e5", "F6g7H8i9J0", "K1l2M3n4O5", "P6q7R8s9T0", "U1v2W3x4Y5", "Z6a7B8c9D0", "E1f2G3h4I5", "J6k7L8m9N0", "O1p2Q3r4S5", "T6u7V8w9X0", "Y1z2A3b4C5", "D6e7F8g9H0", "I1j2K3l4M5", "N6o7P8q9R0", "S1t2U3v4W5", "X6y7Z8a9B0", "C1d2E3f4G5", "H6i7J8k9L0", "M1n2O3p4Q5", "R6s7T8u9V0"],
  firstName: ["Alice", "Bob", "Charlie", "Diana", "Evan", "Fiona", "George", "Hannah", "Ian", "Julia", "Kevin", "Laura", "Michael", "Nina", "Oscar", "Paula", "Quincy", "Rachel", "Steven", "Tina"],
  lastName: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"],
  email: [
    "alice.smith@example.com",
    "bob.johnson@example.com",
    ,
    "diana.brown@example.com",
    "evan.jones@example.com",
    ,
    "george.davis@example.com",
    "hannah.garcia@example.com",
    "ian.rodriguez@example.com",
    "julia.martinez@example.com",
    "kevin.hernandez@example.com",
    "laura.lopez@example.com",
    "michael.gonzalez@example.com",
    "nina.wilson@example.com",
    "oscar.anderson@example.com",
    "paula.thomas@example.com",
    "quincy.taylor@example.com",
    "rachel.moore@example.com",
    "steven.jackson@example.com",
    "tina.martin@example.com",
  ],
  jobTitle: [
    "Software Engineer",
    "Marketing Specialist",
    "Financial Analyst",
    "HR Coordinator",
    "Operations Manager",
    "Sales Associate",
    "IT Support Specialist",
    "Customer Service Representative",
    "Research Analyst",
    "Product Developer",
    "Backend Engineer",
    "Digital Marketer",
    "Accountant",
    "Recruiter",
    "Logistics Coordinator",
    "Sales Executive",
    "Systems Administrator",
    "Help Desk Specialist",
    "Data Scientist",
    "Frontend Developer",
  ],
  salary: [85000, 60000, 75000, 50000, 1000, 55000, 70000, 48000, 72000, 77000, 90000, 58000, 76000, 51000, 82000, 56000, 73000, 49000, 74000, 78000],
  currentPerformance: [80, 69, 98, 71, 67, 82, 90, 50, 78, 90, 85, 82, 90, 71, 93, 82, 78, 50, 78, 90],
  previousPerformance: [80, 70, 79, 69, 93, 82, 78, 50, 95, 90, 85, 80, 89, 70, 93, 70, 78, 50, 78, 90],
};


document.addEventListener('DOMContentLoaded', function () {

  const referenceElement = document.getElementById("our_grid");

    // 1) Create the chart container
    const chartDiv = document.createElement("div");
    chartDiv.id = "chart";
    //chartDiv.style.width = "100%";
    //chartDiv.style.height = "400px";
    //chartDiv.textContent = "Chart placeholder...";

    // 2) Create the button
    const button = document.createElement("button");
    button.id = "button";
    button.textContent = "Generate Chart";
  button.addEventListener("click", function(){
    //chartDiv.style.width = "100%";
    chartDiv.style.height = "400px";
    createChart();
    
  });

    // 3) Create the original grid
    const originalGrid = document.createElement("div");
    originalGrid.id = "original_grid";
    originalGrid.className = "container";
    //originalGrid.textContent = "Original Grid content here...";

    // Insert the elements in the desired order, each AFTER the last one inserted:
    // a) Insert button AFTER #myElement
    referenceElement.parentNode.insertBefore(button, referenceElement.nextSibling);

    // b) Insert chart AFTER the button
    button.parentNode.insertBefore(chartDiv, button.nextSibling);

    // c) Insert original grid AFTER the chart
    chartDiv.parentNode.insertBefore(originalGrid, chartDiv.nextSibling);
  
Grid.grid("original_grid", {
  dataTable: {
    columns: org_employeeData,
  },
  caption: { text: "<h2>Employees</h2>" },
  rendering: {
    theme: "original-theme",
    rows: {
      //bufferSize: 10,
      strictHeights: true,
      //minVisibleRows: 10,
      //virtualizationThreshold: 4,
      virtualization: true,
    },
  },
  header: ["id", "firstName", "lastName", "email", { format: "Employee details", columns: ["jobTitle", "currentPerformance", { columnId: "salary", format: "Salary" }] }],
  columns: [
    {
      id: "id",
      header: {
        format: "",
      },
      cells: {
        className: "hcg-center",
        format: "<input type='checkbox' value='{value}' />",
      },
    },
    {
      id: "firstName",
      header: {
        format: "Name",
      },
      cells: {
        format: "{row.data.firstName} {row.data.lastName}",
      },
    },
    {
      id: "lastName",
      enabled: false,
    },
    {
      id: "email",
      header: {
        format: "Email",
      },
      cells: {
        format: "{#if (ne value '')}<a href='mailto:{value}'>{value}</a>{else}N/A{/if}",
      },
    },
    {
      id: "jobTitle",
      header: {
        format: "Title",
      },
    },
    {
      id: "salary",
      cells: {
        className: "hcg-right",
        format: "${value:,.0f}",
      },
    },
    {
      id: "currentPerformance",
      header: {
        format: "Performance",
      },
      cells: {
        className: "hcg-center",
        formatter: function () {
          const currentValue = this.value;
          const previousValue = this.row.data.previousPerformance;
          const color = currentValue < previousValue ? ["red_org", "↓"] : currentValue > previousValue ? ["green_org", "↑"] : ["", ""];
          const attention = currentValue - previousValue < -10 ? "redder_org" : currentValue - previousValue > 10 ? "greener_org" : "";

          const badge = `
          <span class="performance_org ${color[0]} ${attention}">
            <span>${color[1]}</span>
            ${currentValue}
          </span>
          `;
          return badge;
        },
      },
    },
  ],
});
});
