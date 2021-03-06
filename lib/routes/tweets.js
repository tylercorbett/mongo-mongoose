const Router = require('express').Router;
const Tweet = require('../models/Tweet');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { handle, text } = req.body;
    if(req.query.random) {
      Tweet
        .create({ handle, text: req.quote })
        .then(tweet => res.send(tweet))
        .catch(next);
    }
    else {
      Tweet
        .create({ handle, text })
        .then(tweet => res.send(tweet))
        .catch(next);
    }
  })
  .get('/:id', (req, res, next) => {
    const id = req.params.id;
    Tweet
      .findById(id)
      .populate('handle')
      .select('_id text handle')
      .then(foundTweet => res.send(foundTweet))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tweet
      .find()
      .select('_id text handle')
      .then(tweets => res.send(tweets))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    const id = req.params.id;
    Tweet
      .findByIdAndUpdate(id, req.body, { new: true })
      .populate('handle')
      .select('_id text handle')
      .then(updatedTweet => res.send(updatedTweet))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Tweet
      .findByIdAndDelete(id)
      .populate('handle')
      .select('_id text handle')
      .then(deleted => res.send(deleted))
      .catch(next);
  });
  
