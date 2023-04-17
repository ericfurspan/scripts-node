// import fetch from 'node-fetch';
// import blueChips from '../data/m1-blue-chips.json' assert { type: "json" };

// /**
//  * TODO:
//  * create a basic react frontend that accepts an array of ticker symbols and outputs key financial metrics.
//  * user can select which metrics to include (radio boxes).
//  * output options:
//  *  show results in datatable, give option to export to csv
//  */

// /**
//  * References:
//  *
//  * financial ratios: https://www.fidelity.com/insights/investing-ideas/key-financial-ratios
//  * yahoo finance modules: https://syncwith.com/yahoo-finance/yahoo-finance-api#9ec3ad7d4e144db2b16a3d6545bd528c
//  */

// const baseUrl = "https://query1.finance.yahoo.com/v11";
// const modules = "summaryDetail,defaultKeyStatistics,financialData"; 

// const sortByMarketCap = ({ marketCap: marketCapA }, { marketCap: marketCapB }) => {
//   if (marketCapB < marketCapA) return -1;
//   if (marketCapB > marketCapA) return 1;

//   return 0;
// };

// export default async () => {
//   try {
//     let results = [];

//     for (let i = 0; i < blueChips.length; i++) {
//       const { name, symbol } = blueChips[i];

//       const query = `${baseUrl}/finance/quoteSummary/${symbol}?modules=${modules}`
//       const res = await (await fetch(query)).json();

//       const { summaryDetail, defaultKeyStatistics, financialData } = res.quoteSummary.result[0];
//       const { dividendYield, marketCap, trailingPE, forwardPE } = summaryDetail ?? {};
//       const { pegRatio, priceToBook, trailingEps, forwardEps } = defaultKeyStatistics ?? {};
//       const { freeCashflow, totalCashPerShare } = financialData ?? {};

//       results.push({
//         name,
//         symbol,
//         marketCap: marketCap?.raw,
//         dividendYield: dividendYield?.fmt,
//         pegRatio: pegRatio?.fmt,
//         priceToBook: priceToBook?.fmt,
//         trailingPE: trailingPE?.fmt,
//         forwardPE: forwardPE?.fmt,
//         trailingEps: trailingEps?.fmt,
//         forwardEps: forwardEps?.fmt,
//         freeCashflow: freeCashflow?.fmt,
//         totalCashPerShare: totalCashPerShare?.fmt
//       });
//     }

//     results.sort(sortByMarketCap);
//     console.table(results);
//   } catch (error) {
//     console.error(error.message);
//   }
// }