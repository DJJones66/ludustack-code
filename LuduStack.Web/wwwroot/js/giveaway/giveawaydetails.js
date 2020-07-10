﻿var GIVEAWAYDETAILS = (function () {
    "use strict";

    var selectors = {};
    var objs = {};

    function setSelectors() {
        selectors.canInteract = '#caninteract';
        selectors.urls = '#urls';
        selectors.container = '#featurecontainer';
        selectors.containerList = '#containerlist';
        selectors.form = '#frmEnterGiveaway';
        selectors.emailInput = '#Enter_Email';
        selectors.btnEnter = '#btnEnterGiveaway';
        selectors.urlInput = '.url-input';
    }

    function cacheObjs() {
        objs.container = $(selectors.container);
        objs.urls = $(selectors.urls);
        objs.form = $(selectors.form);
        objs.emailInput = $(selectors.emailInput);
        objs.urlInput = $(selectors.urlInput);
    }

    function init() {
        setSelectors();
        cacheObjs();

        bindAll();

        FX.StartCountDown('#SecondsToEnd');

        var userIsIn = $(selectors.emailInput).length === 0;

        if (userIsIn) {
            FX.Poof();

            var referalUrl = objs.urlInput.data('urlFull');
            console.log(referalUrl);
            var shortUrl = shortenUrl(referalUrl);
            console.log(shortUrl);
        }
    }

    function bindAll() {
        bindBtnEnter();
    }

    function bindBtnEnter() {
        objs.container.on('click', selectors.btnEnter, function (e) {
            e.preventDefault();
            var btn = $(this);

            var valid = objs.emailInput.val().length > 0;

            if (valid) {
                submitForm(btn);
            }
            else {
                ALERTSYSTEM.ShowWarningMessage("You must type your email to participate!");
            }

            return false;
        });
    }

    function shortenUrl(url) {
        $.ajax({
            url: 'https://goolnk.com/api/v1/shorten',
            method: 'POST',
            headers: { 'Access-Control-Allow-Origin': '*' },
            async: false,
            crossDomain: true,
            dataType: "json",
            data: { url: url }
        }).done(function (response) {
            console.log(response);

            return response.result_url;
        });

        return url;
    }

    function submitForm(btn, callback) {
        btn.addClass('disabled');
        var url = objs.form.attr('action');

        var data = objs.form.serialize();

        $.post(url, data).done(function (response) {
            if (response.success === true) {
                if (callback) {
                    callback();
                }

                window.location = response.url;
            }
            else {
                ALERTSYSTEM.ShowWarningMessage("Unable to join the gvieaway.");
                btn.removeClass('disabled');
            }
        });
    }

    return {
        Init: init
    };
}());

$(function () {
    GIVEAWAYDETAILS.Init();
});