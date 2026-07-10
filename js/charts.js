/* global Chart, ChartDataLabels */
const charts = {};

const COLORS = {
    cyan: 'rgba(0, 242, 254, 0.8)',
    blue: 'rgba(79, 172, 254, 0.8)',
    indigo: 'rgba(99, 102, 241, 0.8)',
    pink: 'rgba(239, 68, 68, 0.8)',
    amber: 'rgba(245, 158, 11, 0.8)',
    emerald: 'rgba(16, 185, 129, 0.8)',
    violet: 'rgba(139, 92, 246, 0.8)'
};

function destroyChart(key) {
    if (charts[key]) {
        charts[key].destroy();
        charts[key] = null;
    }
}

function renderCharts(data) {
    const sortedYears = Object.entries(data.years).sort((a, b) => a[0].localeCompare(b[0]));
    const yearLabels = sortedYears.map(x => x[0]);
    const yearValues = sortedYears.map(x => x[1]);

    const sortedClass = Object.entries(data.classifications).sort((a, b) => b[1] - a[1]);
    const classLabels = sortedClass.map(x => x[0]);
    const classValues = sortedClass.map(x => x[1]);

    const sortedCampuses = Object.entries(data.campuses).sort((a, b) => b[1] - a[1]).slice(0, 7);
    const campusLabels = sortedCampuses.map(x => x[0]);
    const campusValues = sortedCampuses.map(x => x[1]);

    destroyChart('year');
    charts.year = new Chart(document.getElementById('chartYear'), {
        type: 'bar',
        data: {
            labels: yearLabels,
            datasets: [{
                label: 'Processos',
                data: yearValues,
                backgroundColor: 'rgba(0, 242, 254, 0.75)',
                borderColor: '#00f2fe',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: '#00f2fe'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                datalabels: {
                    color: '#ffffff',
                    font: { size: 13, weight: '800' },
                    anchor: 'end',
                    align: 'top',
                    offset: 4
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { font: { size: 12 } }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 12 } }
                }
            }
        }
    });

    destroyChart('type');
    charts.type = new Chart(document.getElementById('chartType'), {
        type: 'doughnut',
        data: {
            labels: classLabels.slice(0, 6),
            datasets: [{
                data: classValues.slice(0, 6),
                backgroundColor: [
                    COLORS.cyan, COLORS.blue, COLORS.indigo,
                    COLORS.violet, COLORS.amber, COLORS.emerald
                ],
                borderColor: '#0b0d19',
                borderWidth: 3,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#e5e7eb',
                        padding: 18,
                        font: { size: 20, weight: '700' },
                        usePointStyle: true
                    }
                },
                datalabels: {
                    color: '#fff',
                    font: { size: 14, weight: '800' },
                    formatter: (v) => v
                }
            }
        }
    });

    destroyChart('priority');
    charts.priority = new Chart(document.getElementById('chartPriority'), {
        type: 'doughnut',
        data: {
            labels: ['Alta', 'Normal', 'Baixa'],
            datasets: [{
                data: [data.priorities['Alta'], data.priorities['Normal'], data.priorities['Baixa']],
                backgroundColor: [
                    'rgba(255, 45, 85, 0.85)',
                    'rgba(255, 179, 0, 0.85)',
                    'rgba(0, 230, 118, 0.85)'
                ],
                borderColor: '#0b0d19',
                borderWidth: 3,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e5e7eb',
                        padding: 12,
                        font: { size: 13, weight: '700' },
                        usePointStyle: true
                    }
                },
                datalabels: {
                    color: '#fff',
                    font: { size: 14, weight: '800' },
                    formatter: (v) => v
                }
            }
        }
    });

    const sortedReg = Object.entries(data.regionals).sort((a, b) => b[1] - a[1]).slice(0, 4);
    destroyChart('regional');
    charts.regional = new Chart(document.getElementById('chartRegional'), {
        type: 'pie',
        data: {
            labels: sortedReg.map(x => x[0]),
            datasets: [{
                data: sortedReg.map(x => x[1]),
                backgroundColor: [COLORS.blue, COLORS.indigo, COLORS.cyan, COLORS.amber],
                borderColor: '#0b0d19',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#e5e7eb',
                        font: { size: 12, weight: '700' },
                        usePointStyle: true
                    }
                },
                datalabels: {
                    color: '#fff',
                    font: { size: 13, weight: '800' },
                    formatter: (v) => v
                }
            }
        }
    });

    destroyChart('classification');
    charts.classification = new Chart(document.getElementById('chartClassification'), {
        type: 'bar',
        data: {
            labels: classLabels.slice(0, 5),
            datasets: [{
                data: classValues.slice(0, 5),
                backgroundColor: 'rgba(99, 102, 241, 0.75)',
                borderColor: '#6366f1',
                borderWidth: 2,
                borderRadius: 6,
                hoverBackgroundColor: '#6366f1'
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                datalabels: {
                    color: '#ffffff',
                    font: { size: 13, weight: '800' },
                    anchor: 'end',
                    align: 'right',
                    offset: 4
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: 18 } }
                }
            }
        }
    });

    destroyChart('campus');
    charts.campus = new Chart(document.getElementById('chartCampus'), {
        type: 'bar',
        data: {
            labels: campusLabels,
            datasets: [{
                data: campusValues,
                backgroundColor: 'rgba(16, 185, 129, 0.75)',
                borderColor: '#10b981',
                borderWidth: 2,
                borderRadius: 6,
                hoverBackgroundColor: '#10b981'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                datalabels: {
                    color: '#ffffff',
                    font: { size: 13, weight: '800' },
                    anchor: 'end',
                    align: 'top',
                    offset: 4
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 18 } }
                }
            }
        }
    });
}
