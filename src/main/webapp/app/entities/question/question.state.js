(function() {
    'use strict';

    angular
        .module('interviewApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('question', {
            parent: 'entity',
            url: '/question?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Questions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/question/questions.html',
                    controller: 'QuestionController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }]
            }
        })
        .state('question-detail', {
            parent: 'entity',
            url: '/question/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Question'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/question/question-detail.html',
                    controller: 'QuestionDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Question', function($stateParams, Question) {
                    return Question.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'question',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('question-detail.edit', {
            parent: 'question-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/question/question-dialog.html',
                    controller: 'QuestionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Question', function(Question) {
                            return Question.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('question.new', {
            parent: 'question',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/question/question-dialog.html',
                    controller: 'QuestionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                content: null,
                                answer1: null,
                                answer2: null,
                                answer3: null,
                                rightAnswer: null,
                                isActive: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('question', null, { reload: 'question' });
                }, function() {
                    $state.go('question');
                });
            }]
        })
        .state('question.edit', {
            parent: 'question',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/question/question-dialog.html',
                    controller: 'QuestionDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Question', function(Question) {
                            return Question.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('question', null, { reload: 'question' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('question.delete', {
            parent: 'question',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/question/question-delete-dialog.html',
                    controller: 'QuestionDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Question', function(Question) {
                            return Question.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('question', null, { reload: 'question' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
