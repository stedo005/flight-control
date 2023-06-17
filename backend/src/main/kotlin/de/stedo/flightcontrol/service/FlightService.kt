package de.stedo.flightcontrol.service

import de.stedo.flightcontrol.entities.Flight
import de.stedo.flightcontrol.repository.FlightRepository
import org.springframework.stereotype.Service

@Service
class FlightService(
    private val flightRepository: FlightRepository,
) {
    fun addFlight(flight: Flight) {
        flightRepository.save(flight)
    }
}