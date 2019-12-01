Rails.application.routes.draw do
  resources :cards
  root 'onepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
