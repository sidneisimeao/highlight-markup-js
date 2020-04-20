/**
 * Agenda a execução de uma função
 * @param number milliseconds
 * @param callable fn
 */
export const debounceTime = (fn, milliseconds) => {
  let timer = 0;
  return function() {
    const functionCall = () => fn.apply(this, arguments);
    clearTimeout(timer);
    timer = setTimeout(functionCall, milliseconds);
  };
};

/**
 * Domínio do blog
 * @param string theme
 */
export const baseUrl = `${window.location.href}`;

/**
 * Obtem o parametro enviado via url
 * @param string name
 */
export const getUrlParameter = name => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
