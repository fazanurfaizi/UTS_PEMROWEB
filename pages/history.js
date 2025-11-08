export function init() {
    const table = document.getElementById('academic-history-table');

    function initTable() {
        if (!table) {
            return;
        }

        const academicData = [
            { tingkat: 'SD', sekolah: 'SDN Sindanglaya 04', tahun: '2015' },
            { tingkat: 'SMP', sekolah: 'SMPN 17 Bandung', tahun: '2018' },
            { tingkat: 'SMK', sekolah: 'SMKN 04 Bandung', tahun: '2021' },
            { tingkat: 'Perguruan Tinggi', sekolah: 'Universitas Widyata', tahun: 'Ongoing' }
        ];

        table.innerHTML = '';

        academicData.forEach(item => {
            const row = document.createElement('tr');

            const cellTingkat = document.createElement('td');
            cellTingkat.textContent = item.tingkat;
            row.appendChild(cellTingkat);

            const cellSekolah = document.createElement('td');
            cellSekolah.textContent = item.sekolah;
            row.appendChild(cellSekolah);

            const cellTahun = document.createElement('td');
            cellTahun.textContent = item.tahun;
            row.appendChild(cellTahun);

            table.appendChild(row);
        });
    }

    initTable()
}