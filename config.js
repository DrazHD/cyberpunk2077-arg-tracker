require('dotenv').config();
const saveExistingDir = require('website-scraper-existing-directory');

const email = process.env.GITHUB_EMAIL;
const name = process.env.GITHUB_NAME;
const githubUrl = process.env.GITHUB_URL;
const options = {
  plugins: [new saveExistingDir()],
  request: {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
    }
  }
};
const websites = [
  {
    url: 'https://nightcorp.net/',
    name: 'nightcorp.net'
  },
  {
    url: 'http://trauma-team-international.com/',
    name: 'trauma-team-international.com'
  },
  {
    url: 'https://www.cyberpunk.net/',
    name: 'cyberpunk.net'
  },
  {
    url: 'http://world-news-service.com/',
    name: 'world-news-service.com'
  },
  {
    url: 'http://arasaka-corp.com/',
    name: 'arasaka-corp.com'
  },
  {
    url: 'http://militech-corp.com/',
    name: 'militech-corp.com'
  }
];

module.exports = {
  email,
  name,
  githubUrl,
  options,
  websites
};
