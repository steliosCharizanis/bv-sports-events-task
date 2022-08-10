require 'rails_helper'

RSpec.describe "Homes", type: :request do
  describe "fetch_events" do
		it 'return correct json' do
			expected_events = JSON.parse(File.read('db/events_data.json'))
			events = EventsService.new.call
			expect(events).to eq(expected_events)
		end
  end

	describe "fetch_inplay_events" do
		xit 'return nil if bypass geoblocking fails' do
			
		end
		xit 'return correct json if bypass geoblocking succeeds ' do
			
		end
  end
end