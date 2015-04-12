
var reloadComments = function () {
    $.getJSON('/load-comments/', function (data) {
        window.react_ctx_comments = data;
        window.rerenderComments();
    });

};

var submitComment = function (name, text) {

    $.ajax({
        method: 'POST',
        url: '/post-comment/',
        data: {csrfmiddlewaretoken: window.csrftoken, name: name, text: text},
        success: function () {
            reloadComments();
        }
    });
};

module.exports = {
    reloadComments: reloadComments,
    submitComment: submitComment
};
