export const createDogeWallet = async () => {
  var dogecoin = require("node-dogecoin")();

  return dogecoin.auth("MyUserName", "mypassword").getNewAddress();
};
