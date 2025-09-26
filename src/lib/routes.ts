export const routes = {
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  dashboard: "/dashboard",
  shoots: "/shoots",
  shootsCreate: "/shoots/create",
  pictures: "/pictures",
  categories: "/categories",
  featured: "/featured",
  upgrade: "/upgrade",
  account: "/account",
  billing: "/billing",
  notifications: "/notifications",
  signOut: "/auth/sign-out",
  invoices: "/invoice",
  priceList: "/price-list",
  website(userName: string) {
    return `/website/${userName}`;
  },
};
