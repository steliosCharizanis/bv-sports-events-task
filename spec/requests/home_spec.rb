require 'rails_helper'

RSpec.describe "Homes", type: :request do
  describe "GET /live_events" do
    before do
      get '/live_events'
    end
    it 'return 200 ok' do
      expect(response).to have_http_status(200)
    end
  end
end
