module Api
  class ListsController < ApplicationController
    # before_action :authenticate_user!

    def index
      @lists = List.all
      render 'lists/index.json.jbuilder'
    end

    def show
      @list = List.find(params[:id])
      render 'lists/show.json.jbuilder'
    end

    def create
      if !current_user
        head 401
        return
      end

      board = Board.joins(:user_boards).where(:id => params[:board_id], :user_boards => {:user_id => current_user[:id] }).first

      if !board
        head 401
        return
      end

      position = List.where(:board_id => params[:board_id]).count + 1

      new_list_params = list_params
      new_list_params[:position] = position

      @list = List.new(new_list_params)

      if @list.save
        render 'lists/show.json.jbuilder'
      else
        head 400
      end
    end

    def destroy
      @list = List.find_by(id: params[:id])

      if @list.destroy
        head 200
      else
        head 400
      end
    end

    def update
      @list = List.find_by(id: params[:id])

      if @list.update list_params
        if params.key?(:position)
          position = params[:position].to_i
          @list.insert_at(position)
        end
          render 'lists/show.json.jbuilder'
      else
        head 400
      end
    end

    private

    def list_params
      params.permit(:id, :title, :board_id)
    end
  end
end
