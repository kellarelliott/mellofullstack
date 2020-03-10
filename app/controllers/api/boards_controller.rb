module Api
  class BoardsController < ApplicationController
    # before_action :authenticate_user!

    def index
      @boards = Board.all
      render 'boards/index.json.jbuilder'
    end

    def show
      if !current_user
        head 401
        return
      end

      @board = Board.joins(:user_boards).where(:id => params[:id], :user_boards => {:user_id => current_user[:id] }).first

      if @board.present?
        render 'boards/show.json.jbuilder'
      else
        head 401
      end
    end

    def create
      if current_user

        @board = Board.new(:name => params[:name])

        if @board.save
          user_board = UserBoard.new(:user_id => current_user[:id], :board_id => @board[:id])
          if user_board.save
            render 'boards/show.json.jbuilder'
          else
            head 400
          end
        else
          head 400
        end
      else
        head 401
      end
    end

    def destroy
      @board = Board.find_by(id: params[:id])
      if @board.destroy
        head 200
      else
        head 400
      end
    end

    private

    def board_params
      params.permit(:name, :user_id)
    end
  end
end
