module Api
  class CardsController < ApplicationController
    # before_action :authenticate_user!

    def index
      @cards = Card.all
      render 'cards/index.json.jbuilder'
    end

    def show
      @card = Card.find(params[:id])
      render 'cards/show.json.jbuilder'
    end

    def create
      if !current_user
        head 401
        return
      end

      board = Board.joins(:user_boards, :lists).where(:lists => { :id => params[:list_id] }, :user_boards => { :user_id => current_user[:id] }).first

      if !board
        head 401
        return
      end

      position = Card.where(:list_id => params[:list_id]).count + 1

      new_card_params = card_params
      new_card_params[:position] = position

      @card = Card.new(new_card_params)

      if @card.save
        render 'cards/show.json.jbuilder'
      else
        head 400
      end
    end

    def destroy
      @card = Card.find_by(id: params[:id])

      if @card.destroy
        head 200
      else
        head 400
      end
    end

    def update
      @card = Card.find_by(id: params[:id])

      if @card.update card_params
        if params.key?(:position)
          position = params[:position].to_i
          @card.insert_at(position)
        end
          render 'cards/show.json.jbuilder'
      else
        head 400
      end
    end

    private

    def card_params
      params.permit(:id, :text, :list_id)
    end
  end
end
