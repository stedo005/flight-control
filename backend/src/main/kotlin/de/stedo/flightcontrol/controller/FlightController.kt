package de.stedo.flightcontrol.controller

import de.stedo.flightcontrol.entities.Flight
import de.stedo.flightcontrol.service.FlightService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/flight")
class FlightController(
    private val flightService: FlightService,
) {
    @PostMapping("/add")
    fun addFlight(@RequestBody flight: Flight) {
        flightService.addFlight(flight)
    }
}