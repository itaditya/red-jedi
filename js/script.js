jQuery(function ($) {
    "use strict";
    var githubApiUrl = "https://api.github.com/";
    var githubUrl = "https://github.com/";
    var githubImageUrl = "https://avatars3.githubusercontent.com/u/";
    var mainUrl = "http://red-jedi-backend.herokuapp.com/api/";

    function getLeaderboardData() {
        var leaderboardUrl = mainUrl + "leaderboard";
        // leaderboardUrl = "/js/JSON/leaderboard.json";
        var leaderboardItem = $("#leaderboardTable .item");
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
            getTopRepoData();
        });
    }

    function getTopRepoData() {
        var topRepoUrl = mainUrl + "topRepos?limit=3";
        var topRepoItem = $(".services .service");
        $.get(topRepoUrl, function (repos) {
            console.log(repos);
            $.each(repos, function (key, repo) {
                var row = topRepoItem.eq(key);
                repo.link = githubUrl + repo.fullName;
                repo.language = repo.language.toLowerCase() || "html";
                repo.description = repo.description || "N/A";
                repo.icon = "devicon-" + repo.language + "-plain";
                row.find(".icon-holder i").addClass(repo.icon);
                row.find(".heading").html(repo.name);
                row.find(".description").html(repo.description);
                row.find(".link").attr("href", repo.link);
            })
            getParticipantsData();
        });
    }

    function getAllRepoData() {
        var topRepoUrl = mainUrl + "topRepos";
        $.get(topRepoUrl, function (repos) {
            console.log(repos);
        });
    }

    function getParticipantsData() {
        var ParticipantsUrl = mainUrl + "allUsers";
        var ParticipantsItem = $(".owl-twitter .item");
        $.get(ParticipantsUrl, function (users) {
            console.log(users);
            $.each(users, function (key, user) {
                var index = parseInt(key / 4);
                key = key % 4;
                var ParticipantsElem = ParticipantsItem.eq(index);
                var col = ParticipantsElem.find(".user-col").eq(key);
                user.link = githubUrl + user.login;
                user.image = githubImageUrl + user.userId + "?v=3&s=150";
                col.find("#userName").html(user.name);
                col.find("#userLink").attr("href", user.link);
                col.find("#userImage").attr("src", user.image);
            })
        });
    }

    function getUserData() {
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
