Rails.application.routes.draw do
  resources :words
  devise_for :users
  resources :cards
  root 'onepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
