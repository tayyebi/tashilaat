(function() {
  const data = window.TASHILAAT_DATA || { banks: [], loans: [] };

  function formatCurrency(amount) {
    if (amount >= 1000000000) return (amount / 1000000000).toLocaleString('fa-IR') + ' میلیارد';
    if (amount >= 1000000) return (amount / 1000000).toLocaleString('fa-IR') + ' میلیون';
    return amount.toLocaleString('fa-IR') + ' تومان';
  }

  function formatTerm(months) {
    if (months >= 12) return (months / 12) + ' سال';
    return months + ' ماه';
  }

  document.addEventListener('DOMContentLoaded', function() {
    const selects = document.querySelectorAll('.loan-select');
    const selectAll = document.getElementById('select-all');
    const compareBar = document.getElementById('compare-bar');
    const compareCount = document.getElementById('compare-count');
    const compareBtn = document.getElementById('compare-btn');
    const compareModal = document.getElementById('compare-modal');
    const compareOverlay = document.getElementById('compare-overlay');
    const compareClose = document.getElementById('compare-close');
    const compareContent = document.getElementById('compare-content');

    function updateCompareBar() {
      const checked = document.querySelectorAll('.loan-select:checked');
      const count = checked.length;
      compareCount.textContent = count.toLocaleString('fa-IR') + ' وام انتخاب شده';
      compareBtn.disabled = count < 2;
      if (count > 0) {
        compareBar.classList.remove('translate-y-full');
      } else {
        compareBar.classList.add('translate-y-full');
      }
    }

    function openCompare() {
      const checked = document.querySelectorAll('.loan-select:checked');
      if (checked.length < 2) return;

      compareContent.innerHTML = '';
      const selectedLoans = [];
      checked.forEach(cb => {
        const loanId = cb.value;
        const loan = data.loans.find(l => l.id === loanId);
        if (loan) selectedLoans.push(loan);
      });

      const table = document.createElement('table');
      table.className = 'w-full text-sm';
      table.dir = 'rtl';

      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      headerRow.className = 'border-b border-border';
      const th = document.createElement('th');
      th.className = 'text-right py-3 px-3 text-text-muted font-sahel';
      th.textContent = 'ویژگی';
      headerRow.appendChild(th);

      selectedLoans.forEach(loan => {
        const th = document.createElement('th');
        th.className = 'text-right py-3 px-3 text-text-primary font-bold font-sahel';
        th.textContent = loan.name;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement('tbody');
      const fieldLabels = {
        bank: 'موسسه',
        type: 'نوع تسهیلات',
        contract: 'نوع قرارداد',
        max_amount: 'حداکثر مبلغ',
        min_amount: 'حداقل مبلغ',
        interest_rate: 'نرخ سود',
        effective_rate: 'نرخ موثر',
        max_term_months: 'بازپرداخت',
        collateral: 'نوع ضمانت',
        processing_time: 'زمان دریافت'
      };

      Object.entries(fieldLabels).forEach(([key, label]) => {
        const tr = document.createElement('tr');
        tr.className = 'border-b border-border';

        const td = document.createElement('td');
        td.className = 'py-3 px-3 text-text-muted text-xs font-sahel';
        td.textContent = label;
        tr.appendChild(td);

        selectedLoans.forEach(loan => {
          const td = document.createElement('td');
          td.className = 'py-3 px-3 text-text-primary text-sm font-sahel';
          let val = loan[key];
          if (key === 'bank') {
            const bank = data.banks.find(b => b.id === val);
            val = bank ? bank.name : val;
          } else if (key === 'max_amount' || key === 'min_amount') {
            val = formatCurrency(val);
          } else if (key === 'max_term_months') {
            val = formatTerm(val);
          } else if (key === 'interest_rate' || key === 'effective_rate') {
            val = val + '%';
          }
          td.textContent = val || '-';
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      compareContent.appendChild(table);
      compareModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    selects.forEach(cb => {
      cb.addEventListener('change', updateCompareBar);
    });

    if (selectAll) {
      selectAll.addEventListener('change', function() {
        const visibleRows = document.querySelectorAll('.loan-row:not([style*="display: none"])');
        visibleRows.forEach(row => {
          const cb = row.querySelector('.loan-select');
          if (cb) cb.checked = selectAll.checked;
        });
        updateCompareBar();
      });
    }

    if (compareBtn) compareBtn.addEventListener('click', openCompare);
    if (compareOverlay) compareOverlay.addEventListener('click', function() {
      compareModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
    if (compareClose) compareClose.addEventListener('click', function() {
      compareModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });
})();
