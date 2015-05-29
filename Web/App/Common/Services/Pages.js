﻿(function () {
    'use strict';
    angular.module('esqtv.common').service('PageService', function ($http, esqtvSettings) {

        var service = {
            get: getPage,
            search: search            
        };

        return service;

        function getPage(id) {
            return $http.get(esqtvSettings.api + 'v1/contentpages/' + id)
                .then(function (data) {
                    if (data.status === 200) {
                        return data.data;
                    }

                    return [];
                });
        };

        function search(search, paging) {

            var searchQuery = '';
            searchQuery += '&limit=' + paging.itemsPerPage + '&offset=' + paging.currentPage;

            if (search.query != '') {
                searchQuery += '&query=' + search.query;
            }

            return $http.get(esqtvSettings.api + 'v1/contentpages?format=json' + encodeURI(searchQuery))
                 .then(function (data) {
                     if (data.status === 200) {
                         return data.data;
                     }

                     return [];
                 });
        };

    });
})();