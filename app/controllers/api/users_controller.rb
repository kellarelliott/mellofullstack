module Api
  class UsersController < ApplicationController
    # before_action :authenticate_user!

    def index
      if params[:email].present?
        @users = User.where(:email => params[:email])
      else
        @users = User.all
      end

      render 'users/index.json.jbuilder'
    end

    def show

      if current_user && current_user[:id] == params[:id].to_i
        @user = User.find(params[:id])
        render 'users/show.json.jbuilder'
      else
        head 401
      end
    end

  end
end
