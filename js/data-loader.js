/* global EMBEDDED_DATA, processData, updateCampusTable, updateUnitTable, renderCharts */
function hideLoadingOverlay(err) {
    const overlay = document.getElementById('loadingOverlay');
    if (!overlay) return;
    if (err) {
        overlay.querySelector('.loading-text').textContent = 'Erro ao carregar dados';
        overlay.querySelector('.loading-sub').textContent = 'Verifique se embedded-data.js está carregado';
        overlay.querySelector('.spinner').style.display = 'none';
        return;
    }
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 500);
}

function setSyncStatus(type) {
    const text = document.getElementById('syncText');
    const parent = text.parentElement;
    const dot = parent.querySelector('.status-dot');
    const styles = {
        syncing: { text: 'CARREGANDO...', color: '#38bdf8', border: 'rgba(56, 189, 248, 0.2)' },
        synced:  { text: 'DADOS EMBUTIDOS',     color: '#34d399', border: 'rgba(16, 185, 129, 0.2)' },
        error:   { text: 'ERRO',             color: '#ef4444', border: 'rgba(239, 68, 68, 0.2)' }
    };
    const s = styles[type];
    text.textContent = s.text;
    parent.style.color = s.color;
    parent.style.borderColor = s.border;
    dot.style.backgroundColor = s.color;
    dot.style.boxShadow = `0 0 10px ${s.color}`;
}

function loadEmbeddedData() {
    try {
        setSyncStatus('syncing');

        if (!window.EMBEDDED_DATA) {
            throw new Error('EMBEDDED_DATA não encontrado. Verifique embedded-data.js');
        }

        const data = window.EMBEDDED_DATA;

        document.getElementById('kpiTotal').textContent = data.totalCount;
        document.getElementById('kpiHigh').textContent = data.highCount;
        document.getElementById('kpiNormal').textContent = data.normalCount;
        document.getElementById('kpiLow').textContent = data.lowCount;

        const pct = (v) => data.totalCount ? ((v / data.totalCount) * 100).toFixed(1) : 0;
        document.getElementById('kpiHighPct').textContent = `${pct(data.highCount)}% do total`;
        document.getElementById('kpiNormalPct').textContent = `${pct(data.normalCount)}% do total`;
        document.getElementById('kpiLowPct').textContent = `${pct(data.lowCount)}% do total`;

        // Calculate and populate all-time completed processes KPI
        if (data.completedMap) {
            const totalCompleted = Object.values(data.completedMap).reduce((acc, curr) => acc + curr, 0);
            document.getElementById('kpiCompleted').textContent = totalCompleted;
            document.getElementById('kpiCompletedPct').textContent = `${pct(totalCompleted)}% do total`;
        }

        updateCampusTable(data.campusMap);
        updateUnitTable(data.unitMap);

        // 2026-specific data
        if (data.data2026) {
            const d26 = data.data2026;
            document.getElementById('kpiTotal2026').textContent = d26.totalCount;
            document.getElementById('kpiHigh2026').textContent = d26.highCount;
            document.getElementById('kpiNormal2026').textContent = d26.normalCount;
            document.getElementById('kpiLow2026').textContent = d26.lowCount;

            const pct26 = (v) => d26.totalCount ? ((v / d26.totalCount) * 100).toFixed(1) : 0;
            document.getElementById('kpiHighPct2026').textContent = `${pct26(d26.highCount)}% do total`;
            document.getElementById('kpiNormalPct2026').textContent = `${pct26(d26.normalCount)}% do total`;
            document.getElementById('kpiLowPct2026').textContent = `${pct26(d26.lowCount)}% do total`;

            // Calculate and populate 2026 completed processes KPI
            if (data.completedMap) {
                const completed2026 = data.completedMap["2026"] || 0;
                document.getElementById('kpiCompleted2026').textContent = completed2026;
                document.getElementById('kpiCompletedPct2026').textContent = `${pct26(completed2026)}% do total`;
            }

            updateCampusTable(d26.campusMap, 'campusTableBody2026');
            updateUnitTable(d26.unitMap, 'unitTableBody2026');
        }

        renderCharts({
            years: data.yearMap,
            classifications: data.data2026 ? data.data2026.classificationMap : data.classificationMap,
            priorities: { 'Alta': data.highCount, 'Normal': data.normalCount, 'Baixa': data.lowCount },
            regionals: data.data2026 ? data.data2026.regionalMap : data.regionalMap,
            campuses: data.data2026 ? data.data2026.campusMap : data.campusMap,
            completed: data.completedMap
        });

        setSyncStatus('synced');
    } catch (err) {
        console.error(err);
        setSyncStatus('error');
        hideLoadingOverlay(err);
        return;
    }
    hideLoadingOverlay();
}
