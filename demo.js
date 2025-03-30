Grid.AST.allowedTags.push("input");
Grid.AST.allowedAttributes.push("value");
document.addEventListener('DOMContentLoaded', function () {
  console.log(employeeData)
Grid.grid("original_grid", {
  dataTable: {
    columns: employeeData,
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
          const color = currentValue < previousValue ? ["red", "↓"] : currentValue > previousValue ? ["green", "↑"] : ["", ""];
          const attention = currentValue - previousValue < -10 ? "redder" : currentValue - previousValue > 10 ? "greener" : "";

          const badge = `
          <span class="performance ${color[0]} ${attention}">
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
