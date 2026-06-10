---
title: تماس با ما
description: ارتباط با تیم تسهیلات
---

## راه‌های ارتباطی

برای ارتباط با ما می‌توانید از یکی از روش‌های زیر استفاده کنید:

**ایمیل:** contact@tashilaat.ir

**تلفن:** ۰۲۱-۱۲۳۴۵۶۷۸

**آدرس:** تهران، ایران

## فرم تماس

برای ارسال پیام، لطفاً از فرم زیر استفاده کنید. تیم ما در اسرع وقت به پیام شما پاسخ خواهد داد.

<form id="contact-form" class="space-y-4 mt-6">
  <div>
    <label class="block text-sm text-text-secondary mb-1 font-sahel">نام و نام خانوادگی</label>
    <input type="text" required class="input-field w-full font-sahel" placeholder="نام خود را وارد کنید">
  </div>
  <div>
    <label class="block text-sm text-text-secondary mb-1 font-sahel">ایمیل</label>
    <input type="email" required class="input-field w-full font-sahel" placeholder="ایمیل خود را وارد کنید">
  </div>
  <div>
    <label class="block text-sm text-text-secondary mb-1 font-sahel">شماره تماس</label>
    <input type="tel" class="input-field w-full font-sahel" placeholder="شماره تماس (اختیاری)">
  </div>
  <div>
    <label class="block text-sm text-text-secondary mb-1 font-sahel">موضوع</label>
    <select class="input-field w-full font-sahel">
      <option>پیشنهاد</option>
      <option>انتقاد</option>
      <option>گزارش مشکل</option>
      <option>همکاری</option>
      <option>سایر</option>
    </select>
  </div>
  <div>
    <label class="block text-sm text-text-secondary mb-1 font-sahel">پیام</label>
    <textarea required rows="5" class="input-field w-full font-sahel" placeholder="پیام خود را بنویسید"></textarea>
  </div>
  <button type="submit" class="btn-primary font-sahel">ارسال پیام</button>
</form>

<script>
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('پیام شما با موفقیت ارسال شد. تیم ما در اسرع وقت پاسخ خواهد داد.');
});
</script>
