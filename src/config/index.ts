const url = (env: string): string => {
  switch(env) {
    case 'LOCAL':
      return 'http://localhost:3030'

    case 'STAGING':
      return 'https://treaty-api-dev.herokuapp.com';

    case 'PROD':
      return 'https://prod-api-cherished.herokuapp.com';

    default: return 'http://localhost:3030';
  }
};

export default url('LOCAL');
