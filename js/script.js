jQuery(function ($) {
    "use strict";
    var githubApiUrl = "https://api.github.com/";
    var githubUrl = "https://github.com/";
    var githubImageUrl = "https://avatars3.githubusercontent.com/u/";
    var mainUrl = "http://red-jedi-backend.herokuapp.com/api/";
    var leaderboardTable = $("#leaderboardTable");

    function getLeaderboardData() {
        var leaderboardUrl = mainUrl + "leaderboard";
        // leaderboardUrl = "/js/JSON/leaderboard.json";
        var leaderboardItem = leaderboardTable.find(".item");
        $.get(leaderboardUrl, function (users) {
            $.each(users, function (key, user) {
            	var index = parseInt(key / 5);
            	key = key % 5;
            	var leaderboardItemElem = leaderboardItem.eq(index);
                var row = leaderboardItemElem.find(".schedule-row").eq(key);
                user.link = githubUrl + user.login;
                user.image = githubImageUrl + user.userId + "?v=3&s=40";
                row.find("#userName").html(user.name);
                row.find("#userLogin").html(user.login);
                row.find("#userCommits").html(user.weeklyCommits);
                row.find("#userLink").attr("href", user.link);
                row.find("#userImage").attr("src", user.image);
            })
        });
    }

    function getUserData() {
        console.log('test');
        var name = $("#userDataName").val();
        if (name) {
            var userUrl = githubApiUrl + "users/" + name;
            console.log(userUrl);
            $.get(userUrl, function (data) {
                console.log(data);
            });
        }
    }
    $("#userDataForm").submit(function (e) {
        e.preventDefault();
        getUserData();
    });
    // Sliders Init
    var owlSchedule = $('.owl-schedule');
    owlSchedule.owlCarousel({
        singleItem: true,
        pagination: true,
        loop: true,
        autoplay: true
    });
    var owlTestimonials = $('.owl-testimonials');
    owlTestimonials.owlCarousel({
        singleItem: true,
        pagination: true
    });
    var owlTwitter = $('.owl-twitter');
    owlTwitter.owlCarousel({
        singleItem: true,
        pagination: true
    });
    getLeaderboardData();
});
