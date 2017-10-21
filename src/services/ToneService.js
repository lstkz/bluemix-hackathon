/**
 * Tone service
 */
import request from 'superagent';
import _ from 'lodash';
import decorate from 'decorate-it';
import Joi from 'joi';
import config from 'config';

// ------------------------------------
// Exports
// ------------------------------------

const ToneService = {
  getGithubTones,
};

decorate(ToneService, 'ToneService');

export default ToneService;


const credentials = JSON.parse(process.env.VCAP_SERVICES).tone_analyzer[0].credentials;

/**
 * Get tone from watson
 * @param {String} text
 * @returns {{Object}}
 * @private
 */
async function _getTone(text) {
  return await request.post(`${credentials.url}/v3/tone?version=2016-05-19`)
    .auth(credentials.username, credentials.password)
    .send({
      // exclude multiline code blocks
      text: text.replace(/```[\s\S]+?```/g, ''),
    }).then((res) => res.body);
}

/**
 * Get github comments
 * @param {String} org
 * @param {String} repo
 * @param {Number} issueId
 * @returns {Array}
 */
async function getGithubComments(org, repo, issueId) {
  const issueUrl = `https://api.github.com/repos/${org}/${repo}/issues/${issueId}`;
  const {firstIssue, comments} = await Promise.props({
    firstIssue: request
      .get(`${issueUrl}`)
      .auth('', config.GITHUB_TOKEN)
      .then((res) => _.pick(res.body, 'id', 'body')),
    comments: request
      .get(`${issueUrl}/comments`)
      .auth('', config.GITHUB_TOKEN)
      .then((res) => res.body.map((comment) => _.pick(comment, 'id', 'body'))),
  });
  return [firstIssue, ...comments];
}

// ------------------------------------
// Public
// ------------------------------------

/**
 * Get github tones
 * @param {String} org
 * @param {String} repo
 * @param {Number} issueId
 * @returns {Array}
 */
async function getGithubTones(org, repo, issueId) {
  const comments = await getGithubComments(org, repo, issueId);
  await Promise.map(comments, async (comment) => {
    comment.parts = [];
    const toneResult = await _getTone(comment.body);
    if (!toneResult.sentences_tone) {
      return;
    }
    toneResult.sentences_tone.forEach((tone) => {
      const category = _.find(tone.tone_categories, {category_id: 'emotion_tone'});
      if (!category) {
        return;
      }
      const sadness = _.find(category.tones, {tone_id: 'sadness'});
      const minSadness = 0.5;
      if (sadness && sadness.score >= minSadness) {
        comment.parts.push({
          text: tone.text,
          score: sadness.score,
        });
      }
    });
  });
  return comments
    .filter((comment) => comment.parts.length)
    .map((comment) => _.pick(comment, 'id', 'parts'));
}

getGithubTones.params = ['org', 'repo', 'issueId'];
getGithubTones.schema = {
  org: Joi.string().required(),
  repo: Joi.string().required(),
  issueId: Joi.number().required(),
};
