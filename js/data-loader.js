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

        updateCampusTable(data.campusMap);
        updateUnitTable(data.unitMap);

        renderCharts({
            years: data.yearMap,
            classifications: data.classificationMap,
            priorities: { 'Alta': data.highCount, 'Normal': data.normalCount, 'Baixa': data.lowCount },
            regionals: data.regionalMap,
            campuses: data.campusMap
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
