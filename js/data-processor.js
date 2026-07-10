/* global XLSX */
function processData(rows) {
    const cleanRows = rows.map(r => {
        const cleaned = {};
        for (let k in r) {
            cleaned[k.trim()] = r[k];
        }
        return cleaned;
    }).filter(r => r['Processo'] !== null && r['Processo'] !== undefined && String(r['Processo']).trim() !== '');

    const totalCount = cleanRows.length;

    let highCount = 0;
    let normalCount = 0;
    let lowCount = 0;

    const campusMap = {};
    const unitMap = {};
    const regionalMap = {};
    const classificationMap = {};
    const yearMap = {};

    cleanRows.forEach(row => {
        const priority = String(row['Prioridade'] || '').trim().toLowerCase();
        if (priority === 'alta') highCount++;
        else if (priority === 'normal' || priority === 'média' || priority === 'media') normalCount++;
        else if (priority === 'baixa') lowCount++;

        let campus = String(row['Campus'] || 'Não Definido').trim();
        if (campus === 'null' || campus === '') campus = 'Não Definido';
        campusMap[campus] = (campusMap[campus] || 0) + 1;

        let unit = String(row['Unidade'] || 'Não Definida').trim();
        if (unit === 'null' || unit === '') unit = 'Não Definida';
        unitMap[unit] = (unitMap[unit] || 0) + 1;

        let regional = String(row['Regional'] || 'Não Definida').trim();
        if (regional === 'null' || regional === '') regional = 'Não Definida';
        regionalMap[regional] = (regionalMap[regional] || 0) + 1;

        let classification = String(row['Classificação'] || 'Não Definida').trim();
        if (classification === 'null' || classification === '') classification = 'Não Definida';
        classificationMap[classification] = (classificationMap[classification] || 0) + 1;

        let year = 'S/D';
        const recVal = row['Recebido'];
        if (recVal instanceof Date) {
            year = String(recVal.getFullYear());
        } else if (recVal) {
            const strRec = String(recVal).trim();
            const match = strRec.match(/\b(20\d{2})\b/);
            if (match) {
                year = match[1];
            } else if (strRec.length >= 4) {
                const endDigits = strRec.substring(strRec.length - 4);
                if (/^\d{4}$/.test(endDigits)) year = endDigits;
            }
        }
        if (year !== 'S/D' && year.startsWith('20')) {
            yearMap[year] = (yearMap[year] || 0) + 1;
        }
    });

    return {
        totalCount,
        highCount,
        normalCount,
        lowCount,
        campusMap,
        unitMap,
        regionalMap,
        classificationMap,
        yearMap
    };
}
