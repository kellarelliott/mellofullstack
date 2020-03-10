$.ajaxSetup({
  headers: setHeaders()
});

function setHeaders() {
  let jwt = localStorage.getItem('authorization');

  if (jwt) {
    return {
      authorization: jwt
    };
  }

  return {};
}
