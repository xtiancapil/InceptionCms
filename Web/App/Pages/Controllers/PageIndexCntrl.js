﻿;(function () {

'use strict';

angular.module('esqtv.pages').controller("PageIndexCntrl", ['$scope', '$sce', '$http', '$q', '$routeParams', '$window', '$location', 'PageService', pageIndexCntrl]);

function pageIndexCntrl($scope, $sce, $http, $q, $routeParams, $window, $location, pageService) {    
    var vm = this;

    vm.headers = [
    {
        name:'',
        field:'thumb'
    },{
        name: 'Name', 
        field: 'name'
    },{
        name:'Description', 
        field: 'description'
    },{
        name: 'Last Modified', 
        field: 'last_modified'
    }
    ];
    vm.selectItem = selectItem;
    vm.search = {
        query: '',
        results: [],
        clear: function () {
            this.query = '';
        }
    };

    vm.paging = {
        numPages: 5,
        totalItems: 0,
        currentPage: 1,
        itemsPerPage: 12,
        onSelectPage: function () {

            searchPages();
        }
    };

    activate();
    
    function activate() {
        searchPages();
    }

    vm.searchPages = function (page) {        
        vm.paging.currentPage = page ? page : 1;
        searchPages();
    };
    
    function searchPages(){
        pageService.search(vm.search, vm.paging)
                    .then(function (data) {
                        vm.search.results = data.result;
                        vm.paging.totalItems = data.totalItems;
                    });
    }

    vm.selectedVideo = {};

    function selectItem(itm) {
        $location.path('/pages/edit/' + itm.id);
    }

    $scope.$on('esqtv:common:page:select', function (evt, itm) {
        vm.selectedVideo = itm;
        $location.path('/pages/edit/' + itm.id);
    });
}

})();