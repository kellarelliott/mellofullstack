# spec/requests/todos_spec.rb
require 'rails_helper'

RSpec.describe 'Boards API', type: :request do
  let!(:boards) { create_list(:board, 10) }
  let(:board_id) { boards.first.id }

  describe 'GET /api/boards' do
    before { get '/api/boards' }

    it 'returns boards' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /api/boards/:id' do
    before { get "/api/boards/#{board_id}" }

    context 'when the record exists' do
      it 'returns the board' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(board_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:board_id) { 1000 }
 
      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end
    end
  end

  describe 'POST /api/boards' do
    let(:valid_attributes) { { name: 'Project Board'} }

    context 'when the request is valid' do
      before { post '/api/boards', params: valid_attributes }

      it 'creates a board' do
        expect(json['name']).to eq('Project Board')
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'DELETE /api/boards/:id' do
    before { delete "/api/boards/#{board_id}" }

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end