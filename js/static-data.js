// Dados estáticos extraídos da planilha "Cópia de DPROJ - DEMANDAS 02.2026.xlsx"
// Total: 406 demandas | Extraído em 10/07/2026

window.STATIC_DATA = {
    totalCount: 406,
    highCount: 113,
    normalCount: 173,
    lowCount: 120,
    campusMap: {
        "Samambaia": 220,
        "Colemar": 136,
        "Não Definido": 17,
        "Ap. Goiânia": 10,
        "Goiás": 9,
        "Firminópolis": 9,
        "Externo": 2,
        "Anápolis": 1,
        "Cidade Ocidental": 1,
        "Caldas Novas": 1
    },
    unitMap: {
        "SEINFRA": 34,
        "IPTSP": 21,
        "FF": 20,
        "EVZ": 19,
        "EA": 17,
        "IQ": 16,
        "PRAE": 15,
        "FL": 14,
        "FM": 13,
        "PRPI": 13,
        "GR": 12,
        "IEC": 11,
        "FEFD": 10,
        "FE": 10,
        "DGP": 9,
        "SBC": 8,
        "BC": 7,
        "FA": 6,
        "FEN": 6,
        "IB": 5,
        "REG. GOIÁS": 5,
        "REG. FIRMINÓPOLIS": 4,
        "PROEC": 3,
        "PROGRAD": 3,
        "FAV": 2,
        "ICS": 2,
        "IG": 2,
        "REG. CALDAS NOVAS": 2,
        "REG. CIDADE OCIDENTAL": 1,
        "REG. ANÁPOLIS": 1,
        "UFG": 1
    },
    regionalMap: {
        "Goiânia": 378,
        "Goiás": 8,
        "Não Definida": 9,
        "Firminópolis": 9,
        "Cidade Ocidental": 1,
        "Caldas Novas": 1
    },
    classificationMap: {
        "Reformas/Adequações": 181,
        "Outros": 50,
        "Avaliação/Parecer/Estudo": 45,
        "Paisagismo": 36,
        "Construções Novas": 29,
        "Estruturas de Apoio": 22,
        "Regularização/Aprovação": 21,
        "Administrativo": 16,
        "Levantamento": 6
    },
    yearMap: {
        "2026": 62,
        "2025": 71,
        "2024": 95,
        "2023": 91,
        "2022": 65,
        "2021": 13,
        "2020": 1,
        "2019": 5
    }
};

// Função para inicializar o dashboard com dados estáticos
function initStaticDashboard() {
    const data = window.STATIC_DATA;
    
    // KPIs
    document.getElementById('kpiTotal').textContent = data.totalCount;
    document.getElementById('kpiHigh').textContent = data.highCount;
    document.getElementById('kpiNormal').textContent = data.normalCount;
    document.getElementById('kpiLow').textContent = data.lowCount;

    const pct = (v) => data.totalCount ? ((v / data.totalCount) * 100).toFixed(1) : 0;
    document.getElementById('kpiHighPct').textContent = `${pct(data.highCount)}% do total`;
    document.getElementById('kpiNormalPct').textContent = `${pct(data.normalCount)}% do total`;
    document.getElementById('kpiLowPct').textContent = `${pct(data.lowCount)}% do total`;

    // Tabelas
    if (window.updateCampusTable) updateCampusTable(data.campusMap);
    if (window.updateUnitTable) updateUnitTable(data.unitMap);

    // Gráficos
    if (window.renderCharts) {
        renderCharts({
            years: data.yearMap,
            classifications: data.classificationMap,
            priorities: { 'Alta': data.highCount, 'Normal': data.normalCount, 'Baixa': data.lowCount },
            regionals: data.regionalMap,
            campuses: data.campusMap
        });
    }

    // Status
    if (window.setSyncStatus) setSyncStatus('synced');
    if (window.hideLoadingOverlay) hideLoadingOverlay();
}

// Auto-inicializa quando DOM pronto
document.addEventListener('DOMContentLoaded', () => {
    // Aguarda Chart.js e outros scripts carregarem
    const checkReady = setInterval(() => {
        if (window.Chart && window.updateCampusTable && window.renderCharts) {
            clearInterval(checkReady);
            initStaticDashboard();
        }
    }, 100);
});