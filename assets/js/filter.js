(function() {
  const data = window.TASHILAAT_DATA || { banks: [], loans: [] };

  function formatCurrency(amount) {
    if (amount >= 1000000000) return (amount / 1000000000).toLocaleString('fa-IR') + ' میلیارد';
    if (amount >= 1000000) return (amount / 1000000).toLocaleString('fa-IR') + ' میلیون';
    return amount.toLocaleString('fa-IR');
  }

  function getElements() {
    return {
      bank: document.getElementById('filter-bank'),
      type: document.getElementById('filter-type'),
      amount: document.getElementById('filter-amount'),
      collateral: document.getElementById('filter-collateral'),
      bankType: document.getElementById('filter-bank-type'),
      search: document.getElementById('filter-search'),
      reset: document.getElementById('filter-reset'),
      count: document.getElementById('result-count'),
      tbody: document.getElementById('loan-table-body'),
      empty: document.getElementById('empty-state'),
      rows: document.querySelectorAll('.loan-row')
    };
  }

  function filterLoans() {
    const el = getElements();
    const bankVal = el.bank.value;
    const typeVal = el.type.value;
    const amountVal = el.amount.value;
    const collateralVal = el.collateral.value;
    const bankTypeVal = el.bankType.value;
    const searchVal = el.search.value.toLowerCase().trim();

    let visibleCount = 0;

    el.rows.forEach(row => {
      const rowBank = row.dataset.bank;
      const rowType = row.dataset.type;
      const rowAmount = parseInt(row.dataset.amount);
      const rowRate = parseFloat(row.dataset.rate);
      const rowCollateral = row.dataset.collateral;
      const rowBankType = row.dataset.bankType;
      const rowName = row.dataset.name.toLowerCase();

      const matchBank = bankVal === 'all' || rowBank === bankVal;
      const matchType = typeVal === 'all' || rowType === typeVal;
      const matchAmount = amountVal === 'all' || rowAmount <= parseInt(amountVal);
      const matchCollateral = collateralVal === 'all' || rowCollateral === collateralVal;
      const matchBankType = bankTypeVal === 'all' || rowBankType === bankTypeVal;
      const matchSearch = !searchVal || rowName.includes(searchVal);

      const visible = matchBank && matchType && matchAmount && matchCollateral && matchBankType && matchSearch;
      row.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    el.count.textContent = visibleCount.toLocaleString('fa-IR') + ' نتیجه';
    el.empty.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  function sortTable(sortBy) {
    const tbody = document.getElementById('loan-table-body');
    const rows = Array.from(tbody.querySelectorAll('.loan-row'));

    const currentDir = tbody.dataset.sortDir === 'asc' ? 'desc' : 'asc';
    tbody.dataset.sortDir = currentDir;

    rows.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'name':
          aVal = a.dataset.name;
          bVal = b.dataset.name;
          return currentDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        case 'amount':
          aVal = parseInt(a.dataset.amount);
          bVal = parseInt(b.dataset.amount);
          return currentDir === 'asc' ? aVal - bVal : bVal - aVal;
        case 'rate':
          aVal = parseFloat(a.dataset.rate);
          bVal = parseFloat(b.dataset.rate);
          return currentDir === 'asc' ? aVal - bVal : bVal - aVal;
        default:
          return 0;
      }
    });

    rows.forEach(row => tbody.appendChild(row));
  }

  document.addEventListener('DOMContentLoaded', function() {
    const el = getElements();

    if (el.bank) el.bank.addEventListener('change', filterLoans);
    if (el.type) el.type.addEventListener('change', filterLoans);
    if (el.amount) el.amount.addEventListener('change', filterLoans);
    if (el.collateral) el.collateral.addEventListener('change', filterLoans);
    if (el.bankType) el.bankType.addEventListener('change', filterLoans);
    if (el.search) el.search.addEventListener('input', filterLoans);
    if (el.reset) el.reset.addEventListener('click', function() {
      if (el.bank) el.bank.value = 'all';
      if (el.type) el.type.value = 'all';
      if (el.amount) el.amount.value = 'all';
      if (el.collateral) el.collateral.value = 'all';
      if (el.bankType) el.bankType.value = 'all';
      if (el.search) el.search.value = '';
      filterLoans();
    });

    document.querySelectorAll('.sortable').forEach(th => {
      th.addEventListener('click', function() {
        sortTable(this.dataset.sort);
      });
    });
  });
})();
