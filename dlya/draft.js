// Рендер персонального черновика из window.SALON (задаётся в index.html каждого черновика).
(function () {
  const S = window.SALON;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const tel = S.phone.replace(/[^\d+]/g, '');
  const waText = encodeURIComponent('Здравствуйте! Хочу записаться');
  const T = S.theme || {};
  for (const k in T) document.documentElement.style.setProperty('--' + k, T[k]);
  document.title = `${S.name} — ${S.type.toLowerCase()} в ${S.cityIn} | черновик сайта`;

  const priceCards = S.prices.map(g => `
    <div class="card"><h3>${esc(g.cat)}</h3>
      ${g.items.map(([n, p]) => `<div class="row"><span>${esc(n)}</span><span>${esc(p)}</span></div>`).join('')}
    </div>`).join('');

  const book = `
    ${S.wa ? `<a class="btn wa" href="https://wa.me/${S.wa}?text=${waText}" target="_blank">Записаться в WhatsApp</a>` : ''}
    ${S.tg ? `<a class="btn tg" href="${S.tg}" target="_blank">Telegram</a>` : ''}
    <a class="btn ${S.wa || S.tg ? 'ghost' : ''}" href="tel:${tel}">Позвонить</a>`;

  document.body.innerHTML = `
  <div class="draft"><b>Черновик сайта для «${esc(S.name)}».</b> Подготовлен как пример — это не официальный сайт салона. Цены и адрес взяты с Яндекс Карт.</div>
  <header><div class="wrap">
    <a class="logo" href="#">${esc(S.name)}</a>
    <nav><a href="#prices">Цены</a><a href="#about">О нас</a><a href="#masters">Мастера</a><a href="#contacts">Контакты</a></nav>
    <a class="tel" href="tel:${tel}">${esc(S.phone)}</a>
  </div></header>

  <div class="hero"><div class="wrap">
    <div>
      <div class="kicker">${esc(S.type)} · ${esc(S.city)}</div>
      <h1>${esc(S.headline)}</h1>
      <p>${esc(S.lead)}</p>
      <div class="actions">${book}</div>
    </div>
    <div class="art"><div class="big">${esc(S.name)}</div>
      <div class="rating"><b>${esc(S.rating)} ★</b>${esc(S.ratingNote)}</div>
    </div>
  </div></div>

  <section id="prices" style="padding-top:20px"><div class="wrap">
    <h2 class="title">Услуги и цены</h2>
    <p class="sub">${esc(S.pricesNote)}</p>
    <div class="prices">${priceCards}</div>
    ${S.pricesMore ? `<p class="more">${esc(S.pricesMore)}</p>` : ''}
  </div></section>

  <section id="about" style="padding-top:10px"><div class="wrap">
    <h2 class="title">Почему выбирают нас</h2>
    <p class="sub">Цифры с Яндекс Карт.</p>
    <div class="facts">${S.facts.map(([b, s]) => `<div class="fact"><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join('')}</div>
  </div></section>

  <section id="masters" style="padding-top:10px"><div class="wrap">
    <h2 class="title">Наши мастера и работы</h2>
    <p class="sub">В готовом сайте здесь будут ваши фотографии.</p>
    <div class="phs">
      <div class="ph"><b>Фото мастера</b>имя и специализация</div>
      <div class="ph"><b>Фото мастера</b>имя и специализация</div>
      <div class="ph"><b>Фото работ</b>до/после, интерьер</div>
    </div>
  </div></section>

  <section id="contacts" style="padding-top:10px"><div class="wrap contact">
    <div class="info">
      <h2 class="title">Записаться</h2>
      <p class="sub">Выберите удобный способ — ответим быстро.</p>
      <p><b>Адрес</b>${esc(S.address)}</p>
      <p><b>Часы работы</b>${esc(S.hours)}</p>
      <p><b>Телефон</b><a href="tel:${tel}">${esc(S.phone)}</a></p>
      <div class="actions" style="margin-top:20px">${book}</div>
    </div>
    <div class="ph" style="min-height:260px;display:grid;place-content:center">
      <b>Карта проезда</b>здесь будет встроенная Яндекс Карта<br>
      <a href="${S.ya}" target="_blank" style="color:var(--accent);margin-top:8px;display:inline-block">Открыть на Яндекс Картах →</a>
    </div>
  </div></section>

  <footer><div class="wrap">
    <span>© ${esc(S.name)}</span>
    <span>Черновик сайта · сделано <a href="../../">maxlox618.github.io</a></span>
  </div></footer>
  ${S.wa ? `<a class="float" href="https://wa.me/${S.wa}?text=${waText}" target="_blank" aria-label="WhatsApp"><svg width="28" height="28" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.4z"/></svg></a>` : ''}`;
})();
