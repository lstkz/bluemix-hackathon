/* eslint-disable import/no-commonjs */

// for local testing only
// ignored in git
process.env.VCAP_SERVICES = JSON.stringify({
  tone_analyzer: [
    {
      credentials: {
        url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
        username: 'b1da7a3e-ded0-4504-9382-6dcc83943d8a',
        password: 'qUnEeDqmBs2I',
      },
      syslog_drain_url: null,
      volume_mounts: [],
      label: 'tone_analyzer',
      provider: null,
      plan: 'lite',
      name: 'Tone Analyzer-ms',
      tags: [
        'watson',
        'ibm_created',
        'ibm_dedicated_public',
        'lite',
      ],
    },
  ],
});

module.exports = {};
