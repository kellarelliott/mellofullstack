module Api
  class UserBoardsController < ApplicationController
    # before_action :authenticate_user!

    def index
      @user_boards = UserBoard.all
      render 'user_boards/index.json.jbuilder'
    end

    def show
      @user_board = UserBoard.find(params[:id])
      render 'user_boards/show.json.jbuilder'
    end

    def create

      if !current_user
        head 401
        return
      end

      if current_user[:email] == params[:email]
        head 401
        return
      end


      if params[:email].present?
        user = User.where(:email => params[:email])

        if user.exists?
            @user_board = UserBoard.new(:user_id => user.first[:id], :board_id => params[:board_id])
        else
          head 500
          return
        end

      if @user_board.save
        render 'user_boards/show.json.jbuilder'
      else
        head 500
      end
    end
  end

  def destroy
    if params[:id]

      @user_board = UserBoard.find_by(:id => params[:id])
      count = UserBoard.where(:board_id => @user_board[:board_id]).count

      if @user_board.destroy
        if count == 1
          board = Board.find_by(id: @user_board[:id])
          board.destroy
        end
        head 200
      else
        head 400
      end

      return
    end

    @user_board = UserBoard.where(:user_id => params[:user_id], :board_id => params[:board_id]).first

    if !@user_board
      head 400
      return
    end

    if @user_board.destroy
      if count == 1
        board = Board.find_by(id: @user_board[:id])
        board.destroy
      end
      head 200
    else
      head 400
    end

  end

    private

    def user_board_params
      params.permit(:id, :user_id, :board_id, :email)
    end
  end
end
