export const environment = {
  production: false,
  backendEndpoints: ['stockPriceGenerator', 'socialMediaCountGenerator', 'recommendationAlgorithm'],
  backendUrl: 'http://localhost:4200/',
  socialMediaEndpoints: [
    { platform: 'twitter', endpoint: 'http://localhost:4200/twitter' },
    { platform: 'facebook', endpoint: 'http://localhost:4200/facebook' },
    { platform: 'instagram', endpoint: 'http://localhost:4200/instagram' }]
};
