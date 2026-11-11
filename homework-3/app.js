// Готовая защитная механика. Не изменяйте эту функцию.
function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function selectAttempts(filter) {
  const attempts = window.reportData.attempts
  if (filter === 'all') {
    return attempts
  }

  return attempts.filter((attempt) => attempt.passed === (filter === 'passed'))
}

function renderAttempts(attempts, resultCount, resultList) {
  let markup = ''

  attempts.forEach((attempt) => {
    const status = attempt.passed ? 'Порог пройден' : 'Порог не пройден'

    markup += `
      <li class="result-item">
        <span class="result-name">${escapeHtml(attempt.name)}</span>
        <span>${attempt.score} из ${attempt.questionCount} (${attempt.percentage}%) — ${status}</span>
      </li>`
  })

  resultList.innerHTML = markup
  resultCount.textContent = `Показано: ${attempts.length} из ${window.reportData.attempts.length}`
}

function startFilter() {
  const form = document.querySelector('#filter-form')
  const filter = document.querySelector('#filter')
  const resultCount = document.querySelector('#result-count')
  const resultList = document.querySelector('#result-list')

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const attempts = selectAttempts(filter.value)
    renderAttempts(attempts, resultCount, resultList)
  })
}

startFilter()
