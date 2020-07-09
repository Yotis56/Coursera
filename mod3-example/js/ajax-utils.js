(function (global){
  var ajaxUtils = {};
  function getRequestObject(){
    if (window.XMLHttpRequest) {
      return (new XMLHttpRequest);
    } else if (window.activeXObject){
      return (new activeXObject("Microsoft.XMLHTTP"));
    } else {
      global.alert ("Ajax is not supported");
      return (null);
    }
  }

  ajaxUtils.sendGetRequest = function (requestURL, responseHandler, isJsonResponse){
    var request = getRequestObject();
    request.onreadystatechange = function () {
      handleResponse(request, responseHandler, isJsonResponse);
    };
    request.open("get", requestURL, true);
    request.send(null);
  };
  function handleResponse (request, responseHandler, isJsonResponse){
    if ((request.readyState == 4)&&(request.status == 200)){
      if (isJsonResponse == undefined){isJsonResponse = true;}
      if (isJsonResponse) {
        responseHandler(JSON.parse(request.responseText));
      } else {
        responseHandler(request.responseText);
      }
    }
  }

  global.$ajaxUtils = ajaxUtils;
})(window);
