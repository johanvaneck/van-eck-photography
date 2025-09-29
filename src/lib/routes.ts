const appPrefix = "/app";
export const routes = {
  dashboard: `${appPrefix}`,
  account: `${appPrefix}/account`,
  billing: `${appPrefix}/billing`,
  categories: `${appPrefix}/categories`,
  enquiries: `${appPrefix}/enquiries`,
  featured: `${appPrefix}/featured`,
  invoices: `${appPrefix}/invoice`,
  notifications: `${appPrefix}/notifications`,
  pictures: `${appPrefix}/pictures`,
  priceList: `${appPrefix}/price-list`,
  shoots: `${appPrefix}/shoots`,
  shootsCreate: `${appPrefix}/shoots/create`,
  signIn: `/auth/sign-in`,
  signOut: `/auth/sign-out`,
  signUp: `/auth/sign-up`,
  authSuccess: `/auth/success`,
  upgrade: `${appPrefix}/upgrade`,
  website(userName: string) {
    return `${appPrefix}/website/${userName}`;
  },
};
