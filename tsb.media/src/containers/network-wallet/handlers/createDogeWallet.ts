export const createDogeWallet = async () => {
  var dogecoin = require("node-dogecoin")();

  const test = dogecoin.auth("MyUserName", "mypassword").getNewAddress();

  // alert(JSON.stringify(test));

  return test;
};
