module Lists
  extend ActiveSupport::Concern

  TRIP_TYPES = [ 'oneWay', 'roundTrip', 'multiCity' ]
  CABINS = [ 'First', 'Coach' ]
  CABIN_CODES = {
    Delta: ['E','V','X','T','U','L','K','Q','H','S','M',
            'B','Y','W','Z','I','D','C','J','G','A','P','F'],
    American: [],
    United: []
  }


end
