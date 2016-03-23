$(document).ready(function() {
    $('.side-bar .sub-task').click(function() {
        $(this).next().slideToggle("normal");
    });
});
