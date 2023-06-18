package de.stedo.flightcontrol.controller

import de.stedo.flightcontrol.entities.Flight
import de.stedo.flightcontrol.entities.IsOnFlightlist
import de.stedo.flightcontrol.service.FlightService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/flight")
class FlightController(
    private val flightService: FlightService,
) {
    @GetMapping
    fun getAllFlights(): ResponseEntity<List<Flight>> {
        return flightService.getAllFlights()
    }

    @PostMapping("/add/{modelId}")
    fun addFlight(@PathVariable modelId: String): ResponseEntity<Flight> = flightService.addFlight(modelId)

    @GetMapping("/is-model-on-flightlist/{modelId}")
    fun isModelOnFlightList(@PathVariable modelId: String): ResponseEntity<IsOnFlightlist> {
        return ResponseEntity(IsOnFlightlist(flightService.isModelOnFlightList(modelId)),HttpStatus.OK)
    }
}