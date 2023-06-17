const readline = require('readline');
const fetch = require('node-fetch');

function getCountries(pageNumber) {
  return fetch(`https://jsonmock.hackerrank.com/api/countries?page=${pageNumber}`)
    .then(response => response.json())
    .then(data => data);
}

async function getCountryName(code) {
  let currentPage = 1;
  let countryName = null;

  while (!countryName) {
    const response = await getCountries(currentPage);
    const { data, total_pages } = response;
    
    const country = data.find(country => country.alpha2Code === code);
    if (country) {
      countryName = country.name;
      break;
    }
    
    currentPage++;
    if (currentPage > total_pages) {
      break;
    }
  }

  return countryName || 'N/A';
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('', async (code) => {
    const countryName = await getCountryName(code);
    console.log(countryName);
    rl.close();
  });
}

main();
