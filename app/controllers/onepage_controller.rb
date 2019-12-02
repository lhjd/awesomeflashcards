class OnepageController < ApplicationController
  before_action :authenticate_user!, only: []
  def index
  end
end
