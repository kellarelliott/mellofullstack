Rails.application.routes.draw do
  root :to => static('/index.html')
  # using rails-static-router gem to let this work and have the board_id in the url
  get '/boards/:id', :to => static('/board.html')
  get '/boards', :to => static('/user-boards.html')

  namespace :api do
    resources :cards, only: [:index, :show, :create, :update, :destroy]
    resources :lists, only: [:index, :show, :create, :update, :destroy]
    resources :boards, only: [:index, :show, :create, :destroy]
    delete '/user_boards', to: 'user_boards#destroy'
    resources :user_boards, only: [:index, :show, :create, :destroy]
    resources :users, only: [:index, :show]
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  end

  devise_for :users,
    path: '',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'sessions',
      registrations: 'registrations'
    }
end
