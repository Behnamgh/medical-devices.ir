
$(document).ready(function() {
    $(".mCustomScrollbar").mCustomScrollbar({axis:"x"});

    function redirect() {
    document.location.href = '#/browser/' + document.getElementById('search').value;
    document.getElementById('search').value = "";
    return false;
    };
});
