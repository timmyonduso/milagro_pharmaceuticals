import React from 'react'
import EventsHero from '../components/events/EventsHero'
import Contact from '../sections/Contact'
import PastEventsGallery from '../components/events/PastEventsGallery'
import Testimonials from '../sections/Testimonials'

const EventPage = () => {
  return (
    <>
      <EventsHero />
      <PastEventsGallery />
      <Testimonials />
      <Contact />
    </>
  )
}

export default EventPage