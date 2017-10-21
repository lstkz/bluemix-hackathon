/**
 * Contains all application endpoints
 */

import ToneController from './controllers/ToneController';

export default {
  '/tones': {
    post: {
      method: ToneController.getGithubTones,
      public: true,
    },
  },
};
