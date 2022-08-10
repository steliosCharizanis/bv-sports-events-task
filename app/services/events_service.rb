class EventsService
	BV_URL = "http://www.betvictor.com/bv_in_play/v2/en-gb/1/mini_inplay.json"

	def initialize()
		
	end

	def call
		fetch_events
	end

	def fetch_events
		if ENV['RAILS_ENV'] == 'development'
			fetch_static_events 
		else
			#call fetch_inplay_events if ENV['http_proxy'] will work with Net::HTTP.get(uri)
			fetch_static_events 
		end
	end

	private

	def fetch_static_events
		JSON.parse(File.read('db/events_data.json'))
	end

	def fetch_inplay_events
		Rails.cache.fetch("events", expires_in: 10.seconds) do
			uri = URI(BV_URL)
			Net::HTTP.get(uri)
		end
	end
end