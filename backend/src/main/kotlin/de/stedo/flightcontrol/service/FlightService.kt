package de.stedo.flightcontrol.service

import de.stedo.flightcontrol.entities.Flight
import de.stedo.flightcontrol.repository.FlightRepository
import de.stedo.flightcontrol.repository.RcModelRepository
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.sql.Timestamp
import java.time.Instant

@Service
class FlightService(
    private val flightRepository: FlightRepository,
    private val rcModelRepository: RcModelRepository,
) {
    fun getAllFlights(): ResponseEntity<List<Flight>> {
        return ResponseEntity(flightRepository.findAll(), HttpStatus.OK)
    }

    fun addFlight(modelId: String): ResponseEntity<Flight> {
        return if (flightRepository.findById(modelId).isPresent) {
            ResponseEntity(HttpStatus.METHOD_NOT_ALLOWED)
        } else {
            ResponseEntity(
                Flight(
                    rcModel = rcModelRepository.findById(modelId).orElseThrow(),
                    createdAt = Timestamp.from(Instant.now())
                ).let { flightRepository.save(it) }, HttpStatus.OK
            )
        }
    }

    fun isModelOnFlightList(modelId: String): Boolean {
        return flightRepository.findById(modelId).isPresent
    }

    fun getFlightById(id: String): ResponseEntity<Flight> {
        return ResponseEntity(flightRepository.findById(id).orElseThrow(), HttpStatus.OK)
    }

    fun deleteFlight(id: String) {
        flightRepository.deleteById(id)
    }

    fun isPilotOnFlightlist(pilotId: String): Boolean {
        return flightRepository.findAll().any { flight -> flight.rcModel.pilotId == pilotId }
    }
}