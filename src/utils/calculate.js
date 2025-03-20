// // src/utils.js - Data Processing Functions

// // Function to calculate gender distribution
// export const calculateGenderDistribution = (data) => {
//     const result = data.reduce((acc, person) => {
//         acc[person.gender] = (acc[person.gender] || 0) + 1;
//         return acc;
//     }, {});

//     return Object.keys(result).map(gender => ({
//         gender,
//         count: result[gender],
//     }));
// };

// // Function to calculate age range distribution
// export const calculateAgeRangeDistribution = (data) => {
//     const result = data.reduce((acc, person) => {
//         if (person && person.age_range) {  
//             acc[person.age_range] = (acc[person.age_range] || 0) + 1;
//         }
//         return acc;
//     }, {});

//     return Object.keys(result).map(age => ({
//         age,
//         count: result[age],
//     }));
// };


// // Function to calculate total sales
// export const calculateTotalSales = (data) => {
//     return data.length * 50; // Example logic: each transaction = $50
// };

// // Function to calculate food sales
// export const calculateFoodSales = (data) => {
//     return data.length * 25; // Example logic: each food sale = $25
// };

// // Function to calculate beverage sales
// export const calculateBeverageSales = (data) => {
//     return data.length * 15; // Example logic: each beverage sale = $15
// };

// // Function to calculate average sale
// export const calculateAverageSale = (data) => {
//     return calculateTotalSales(data) / (data.length || 1); // Avoid division by zero
// };
