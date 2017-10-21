/**
 * Tone controller
 */
import ToneService from '../services/ToneService';

export default {
  getGithubTones,
};

/**
 * Get github tones
 * @param {Object} req
 * @param {Object} res
 */
async function getGithubTones(req, res) {
  res.json(await ToneService.getGithubTones(req.body.org, req.body.repo, req.body.issueId));
}
