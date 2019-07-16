const config = require('./config');
const scrape = require('website-scraper');
const axios = require('axios');
const checksum = require('checksum');
const git = require('simple-git')();

const { email, name, gitHubUrl, options, websites } = config;

// Add local git config
git.addConfig('user.email', email);
git.addConfig('user.name', name);

// Add remote repo url as origin to repo
git.addRemote('origin', gitHubUrl);

const scrapeWebsite = async ({ url, name }) => {
  await scrape({
    ...options,
    urls: [url],
    directory: `./websites/${name}`
  });

  git
    .add(`./websites/${name}`)
    .commit(name)
    .push('origin', 'master');
};

const checkForChanges = () => {
  websites.forEach(website => {
    axios
      .get(website.url)
      .then(response => {
        // generate seed if it doesn't exist
        if (!website.seed) {
          console.log(
            `${website.url} - seed doesn't exist yet, generating now`
          );
          const seed = checksum(response.data);
          website.seed = seed;
          scrapeWebsite(website);
        } else {
          // seed exists, check it
          const seed = checksum(response.data);
          if (website.seed !== seed) {
            console.log(
              `${website.url} - seed doesn't match, downloading contents...`
            );
            scrapeWebsite(website);
            website.seed = seed;
          }
          return;
        }
      })
      .catch(error => console.error(error));
  });
};

setInterval(() => {
  console.log('Checking websites for changes...');
  checkForChanges();
}, 55000);
