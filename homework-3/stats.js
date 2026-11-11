const PASSING_PERCENTAGE = 67

function isArray(value) {
  return Array.isArray(value)
}

export function validateQuizData(data) {
  if (data === null || typeof data !== 'object' || isArray(data)) {
    return false
  }

  const { quizTitle, correctAnswers, attempts } = data
  if (typeof quizTitle !== 'string' || quizTitle.trim() === '' ||
      !isArray(correctAnswers) || correctAnswers.length === 0 ||
      !isArray(attempts) || attempts.length === 0) {
    return false
  }

  return attempts.every((attempt) =>
    attempt !== null && typeof attempt === 'object' && !isArray(attempt) &&
    typeof attempt.name === 'string' && attempt.name.trim() !== '' &&
    isArray(attempt.answers) && attempt.answers.length === correctAnswers.length
  )
}

export function calculateAttempt(attempt, correctAnswers) {
  let score = 0

  for (let index = 0; index < correctAnswers.length; index += 1) {
    if (attempt.answers[index] === correctAnswers[index]) {
      score += 1
    }
  }

  const percentage = Math.round(score / correctAnswers.length * 100)

  return {
    name: attempt.name.trim(),
    score,
    percentage,
    passed: percentage >= PASSING_PERCENTAGE,
  }
}

export function calculateReport(data) {
  const attempts = data.attempts.map((attempt) => calculateAttempt(attempt, data.correctAnswers))
  let totalPercentage = 0
  let passedCount = 0
  let best = attempts[0]

  attempts.forEach((attempt) => {
    totalPercentage += attempt.percentage
    if (attempt.passed) {
      passedCount += 1
    }
    if (attempt.score > best.score) {
      best = attempt
    }
  })

  return {
    quizTitle: data.quizTitle.trim(),
    questionCount: data.correctAnswers.length,
    participantCount: attempts.length,
    averagePercentage: Math.round(totalPercentage / attempts.length),
    passedCount,
    threshold: PASSING_PERCENTAGE,
    best,
    attempts,
  }
}
