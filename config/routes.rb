Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'main#index'

  get 'testroute' => 'main#testroute'
  ####
  # PAGES
  ####
  # get 'pages/trip/' => 'page#trip'
  get 'pages/trip/:id' => 'page#trip'
  get 'pages/:page' => 'page#view'

  ##########
  # API DATA
  ##########

  get 'airports/search' => 'airports#search'
  get 'routes/search' => 'routes#search'

  ####
  # FLIGHTS
  ####
  resources :flights, constraints: { id: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i } do
    member do
      get :trips
    end
  end

  ####
  # AIRPORTS
  ####
  resources :airports, constraints: { id: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i } do
    member do
      get :flights
    end
  end

  ####
  # AIRLINES
  ####
  resources :airlines, constraints: { id: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i } do
    member do
      get :flights
    end
  end

  ####
  # TRIPS
  ####
  resources :trips, constraints: { id: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i } do
    member do
      get :flights
      put :flights, to: 'trips#update_flights'
    end
  end

end
