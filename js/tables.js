function updateCampusTable(map) {
    const tbody = document.getElementById('campusTableBody');
    tbody.innerHTML = '';

    const sorted = Object.entries(map)
        .filter(([name]) => name !== 'Não Definido' && name !== 'Não Definida')
        .sort((a, b) => b[1] - a[1]);

    const topCampuses = sorted.slice(0, 5);
    const othersCount = sorted.slice(5).reduce((acc, curr) => acc + curr[1], 0) + (map['Não Definido'] || 0);

    if (othersCount > 0) {
        topCampuses.push(['Outros', othersCount]);
    }

    topCampuses.forEach(([name, count], index) => {
        const tr = document.createElement('tr');
        tr.className = `top-${index + 1}`;
        tr.innerHTML = `
            <td><span class="rank-badge">${index + 1}</span>${name}</td>
            <td class="val-col">${count}</td>
        `;
        tbody.appendChild(tr);
    });
}

function updateUnitTable(map) {
    const tbody = document.getElementById('unitTableBody');
    tbody.innerHTML = '';

    const sorted = Object.entries(map)
        .filter(([name]) => name !== 'Não Definida' && name !== 'Não Definido')
        .sort((a, b) => b[1] - a[1]);

    const topUnits = sorted.slice(0, 5);
    const othersCount = sorted.slice(5).reduce((acc, curr) => acc + curr[1], 0) + (map['Não Definida'] || 0);

    if (othersCount > 0) {
        topUnits.push(['Outros', othersCount]);
    }

    topUnits.forEach(([name, count], index) => {
        const tr = document.createElement('tr');
        tr.className = `top-${index + 1}`;
        tr.innerHTML = `
            <td><span class="rank-badge">${index + 1}</span>${name}</td>
            <td class="val-col">${count}</td>
        `;
        tbody.appendChild(tr);
    });
}
