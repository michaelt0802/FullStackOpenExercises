import express from 'express'
import getBmi from './bmiCalculator'
// const express = require('express');
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong')
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack')
});

app.get('/bmi', (req, res) => {
  const height = parseFloat(req.query.height as string)
  const weight = parseFloat(req.query.weight as string)
  console.log(height, weight)

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' })
  }

  const bmi = getBmi(height, weight)
  res.json({
    height: height,
    weight: weight,
    bmi: bmi
  })
})

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});