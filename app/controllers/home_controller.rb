class HomeController < ApplicationController
	def index

	end

	def live_events
		events = EventsService.new().call
		
		render json: { events: events }, status: 200
	end
end
