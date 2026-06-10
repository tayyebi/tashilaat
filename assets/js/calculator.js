(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const calcAmount = document.getElementById('calc-amount');
    const calcTerm = document.getElementById('calc-term');
    const calcRate = document.getElementById('calc-rate');
    const calcBtn = document.getElementById('calc-btn');
    const calcMonthly = document.getElementById('calc-monthly');
    const calcTotal = document.getElementById('calc-total');
    const calcInterest = document.getElementById('calc-interest');

    function calculate() {
      const P = parseFloat(calcAmount.value) || 0;
      const n = parseInt(calcTerm.value) || 1;
      const annualRate = parseFloat(calcRate.value) || 0;

      if (P <= 0 || n <= 0) return;

      const monthlyRate = annualRate / 100 / 12;

      let monthly, total, totalInterest;

      if (annualRate === 0) {
        monthly = P / n;
        total = P;
        totalInterest = 0;
      } else {
        monthly = P * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
        total = monthly * n;
        totalInterest = total - P;
      }

      calcMonthly.textContent = Math.round(monthly).toLocaleString('fa-IR');
      calcTotal.textContent = Math.round(total).toLocaleString('fa-IR') + ' تومان';
      calcInterest.textContent = Math.round(totalInterest).toLocaleString('fa-IR') + ' تومان';
    }

    if (calcBtn) calcBtn.addEventListener('click', calculate);

    [calcAmount, calcTerm, calcRate].forEach(el => {
      if (el) el.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') calculate();
      });
    });

    calculate();
  });
})();
