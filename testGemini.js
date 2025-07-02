const Gemini = require('gemini-api');

const client = new Gemini();

async function testMarketData() {
  try {
    const ticker = await client.getTicker('btcusd');  // example symbol BTC-USD
    console.log('Ticker data:', ticker);
  } catch (error) {
    console.error('Error fetching ticker:', error);
  }
}

testMarketData();
